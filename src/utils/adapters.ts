import { Tariff, TariffDB } from "#tariffs/domain/tariffs.types.js";

export function formatTariff(tariff: Tariff, dtTillMax: string): TariffDB {

  return {
    dt_till_max: dtTillMax,
    warehouse_name: tariff.warehouseName,
    box_delivery_base: parseNumber(tariff.boxDeliveryBase),
    box_delivery_coef: parseNumber(tariff.boxDeliveryCoefExpr),
    box_delivery_liter: parseNumber(tariff.boxDeliveryLiter),
    box_storage_base: parseNumber(tariff.boxStorageBase),
    box_storage_coef: parseNumber(tariff.boxStorageCoefExpr),
    box_storage_liter: parseNumber(tariff.boxStorageLiter),
    created_at: new Date(),
  };
}

export function formatTariffsArray(fetchedTariffs: Tariff[], dtTillMax: string): TariffDB[] {
    return fetchedTariffs.map((tariff) => formatTariff(tariff, dtTillMax));
}

const parseNumber = (value: string | null | undefined): number | null => {
        if (!value || value === '-' || value.trim() === '') return null;
        return parseFloat(value.replace(',', '.'));
    };

export const formatNum = (value: number | string | null): string =>  {
    if (value === null || value === undefined) return "Нет данных";
    if (typeof value === "number") {
        return value.toFixed(2);
    }
    return value.toString();
}