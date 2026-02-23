import knex, { migrate, seed } from "#postgres/knex.js";
import dotenv from 'dotenv';
import { TariffsWorker } from "#tariffs/workers/getTariffs.worker.js";
import { GoogleSheetsWorker } from "#tariffs/workers/syncWithGoogle.worker.js";

import { WBAdapter } from "#tariffs/infrastructure/wb.api.js";
import { TariffsService } from "#tariffs/domain/tariffs.service.js";
import { GoogleSheetsAdapter } from "#tariffs/infrastructure/google.api.js";


async function main() {
    dotenv.config();
    await migrate.latest();
    await seed.run();

    const wbWorker = new TariffsWorker(new WBAdapter(), new TariffsService());
    await wbWorker.doTariffsWork();

    const tariffs = await knex('tariffs').select('*').limit(5);
    console.log("DB result:", tariffs);

    wbWorker.scheduleWork();

    const googleWorker = new GoogleSheetsWorker(new TariffsService(), new GoogleSheetsAdapter());
    await googleWorker.updateSheets(new Date().toISOString().slice(0, 10));
    googleWorker.scheduleWork()

    console.log("App started, workers scheduled");
}

main().catch((err) => {
    console.error("Fatal error", err);
    process.exit(1);
})

