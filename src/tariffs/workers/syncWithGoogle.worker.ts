import cron from "node-cron";
import { TariffsService } from "#tariffs/domain/tariffs.service.js";
import { GoogleSheetsAdapter } from "#tariffs/infrastructure/google.api.js";
import { TariffDB } from "#tariffs/domain/tariffs.types.js";
import { formatNum } from "#utils/adapters.js";

export class GoogleSheetsWorker {

    constructor(
        private service: TariffsService, 
        private googleAdapter: GoogleSheetsAdapter) {}

        private convertTariffsToRows(tariffs: TariffDB[]): string[][] {
            const headers: string[] = [
            "Warehouse",
            "Delivery Base",
            "Delivery Coef",
            "Delivery Liter",
            "Storage Base",
            "Storage Coef",
            "Storage Liter",
            ];
            
           const formattedTariffs: string[][] = tariffs.map((tariff) => [
            tariff.warehouse_name,
            formatNum(tariff.box_delivery_base),
            formatNum(tariff.box_delivery_coef),
            formatNum(tariff.box_delivery_liter), 
            formatNum(tariff.box_storage_base), 
            formatNum(tariff.box_storage_coef), 
            formatNum(tariff.box_storage_liter), 
        ]);

            return [headers, ...formattedTariffs]
        }

        public async updateSheets(date: string | Date) {

            const spreadsheetIds = process.env.GOOGLE_SHEET_IDS?.split(",")
            
            if (spreadsheetIds) {
                const tariffs = await this.service.getTariffsForGoogle(date);
                const rows = this.convertTariffsToRows(tariffs)

                for (const id of spreadsheetIds) {
                    await this.googleAdapter.updateSheets(id, "stocks_coefs", rows)
                }

                console.log("Spreadsheets updated")

            } else {
                console.error("No spreadsheet IDs found");
            }
        }

        public scheduleWork() {
            cron.schedule("0 7 * * *", async () => {
                try {
                    await this.updateSheets(new Date())
                } catch (error) {
                    console.error("Error while updating spreadsheets", error)
                }
            })
        }
}