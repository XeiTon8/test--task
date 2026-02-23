import { formatTariffsArray } from "#utils/adapters.js";
import { TariffsRepository } from "./tariffs.repository.js";
import { tariffSchema, Tariff, TariffDB, APIResponse } from "./tariffs.types.js";

export class TariffsService {

    constructor(private repo = new TariffsRepository()) {}

    public async saveTariffsToDB(fetchedTariffs: APIResponse) {

        const validated: Tariff[] = fetchedTariffs.data.warehouseList.map((tariff) => tariffSchema.parse(tariff));

        const rows: TariffDB[] = formatTariffsArray(validated, fetchedTariffs.data.dtTillMax);

        await this.repo.saveTariffs(rows)
    }

    public async getTariffsForGoogle(date: string | Date) {

        return this.repo.getTariffsByDate(date);
    }
}