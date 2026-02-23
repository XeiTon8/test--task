import { z } from "zod";

export interface APIResponse {
  data: {
    dtNextBox?: string;
    dtTillMax: string;
    warehouseList: Tariff[]
  }
}

export interface Tariff {
    id?: number;
    warehouseName: string;
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    createdAt?: Date | string;
}

export interface TariffDB {
  id?: number;
  dt_till_max: string;
  warehouse_name: string;
  box_delivery_base: BoxNumType;
  box_delivery_coef: BoxNumType;
  box_delivery_liter: BoxNumType;
  box_storage_base: BoxNumType;
  box_storage_coef: BoxNumType;
  box_storage_liter: BoxNumType;
  created_at: string | Date;
}

export const tariffSchema = z.object({
  warehouseName: z.string().min(1),
  boxDeliveryBase: z.string(),
  boxDeliveryCoefExpr: z.string(),
  boxDeliveryLiter: z.string(),
  boxStorageBase: z.string(),
  boxStorageCoefExpr: z.string(),
  boxStorageLiter: z.string(),
});

type BoxNumType = number | null;