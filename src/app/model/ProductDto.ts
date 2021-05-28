import { Category } from "./category";

export class ProductDto{
    productId: string | undefined;
    productName: string | undefined;
    productPrice: string | undefined;
    categoryList: Category[] | undefined;
}