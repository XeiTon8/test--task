import { TariffsService } from "#tariffs/domain/tariffs.service.js";
import { WBAdapter } from "#tariffs/infrastructure/wb.api.js";
import cron from 'node-cron'

export class TariffsWorker {

    public adapter: WBAdapter
    public service: TariffsService;
    public cron = cron;

    constructor(adapter: WBAdapter, service: TariffsService) {
        this.adapter = adapter;
        this.service = service;
    }

    public async doTariffsWork() {
        const today = new Date();
        const day = today.toISOString().slice(0, 10);
        
        const res =  await this.adapter.fetchTariffs(day);
        await this.service.saveTariffsToDB(res) 
    }

    public scheduleWork() {
        cron.schedule('0 * * * *', async () => {
            try {
            await this.doTariffsWork();
            console.log("Tariffs fetched successfully")
            } catch (error) {
                console.error(error);
                
            }
        })
    }
}