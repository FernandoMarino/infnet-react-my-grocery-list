export const UNITS_OF_MEASURE = ["un" , "kg" , "g" , "L" , "ml" , "pct" , "cx" , "oz" , "gal"];

export type UnitOfMeasure = "un" | "kg" | "g" | "L" | "ml" | "pct" | "cx" | "oz" | "gal";

export interface IShoppingItemDTO {
    _id?: string;
    name: string;
    quantity?: number;
    unitOfMeasure?: UnitOfMeasure;
    checked?: boolean;
}
