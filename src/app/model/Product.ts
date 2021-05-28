import { Category } from "./category";

export class Product{
    name: string | undefined;
    quantity: number | undefined;
    price: number | undefined;
    code: string | undefined
    categoryList: Category[] | undefined;

    public constructor(name: string, quantity: number, price: number, categoryList: Category[], code: string){
        this.name= name
        this.quantity = quantity
        this.price = price;
        this.categoryList = categoryList;
        this.code = code;
    }
}