import axios, { Axios } from 'axios';

export class WBAdapter {

    fetcher: Axios;

    constructor() {
        this.fetcher = axios;
    }

    public async fetchTariffs(date: string) {
      try {
         const res = await this.fetcher.get("https://common-api.wildberries.ru/api/v1/tariffs/box", {
            headers: {
                Authorization: `Bearer ${process.env.WB_API_KEY}`
            },
            params: {
                date
            }
        })
        const extractedTariffs = res.data.response;
        return extractedTariffs;

      } catch (error: any) {
          if (error.title) {
                console.error(
                    "WB API returned error:",
                    error.title,
                    error.detail
                );
            } else {
                console.error("Axios error:", error.message);
            }
            throw error;
      }
    }
}