import knex from "#postgres/knex.js";
import { Tariff, TariffDB } from "./tariffs.types.js";

export class TariffsRepository {
    
    public async saveTariffs(tariffs: TariffDB[]) {

    try {
        await knex("tariffs")
        .insert(tariffs)
        .onConflict(['dt_till_max', "warehouse_name"])
        .merge()
    } catch (error) {
        console.error("DB ERROR:", error);
        throw error;
    }
}

    public getTariffsByDate(date: string | Date) {
       return knex("tariffs")
        .where('dt_till_max', '>=', date)
        .orderBy('dt_till_max', 'asc')
        .orderBy('box_delivery_coef', 'asc')
    }
}