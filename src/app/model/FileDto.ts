import type { Product } from "./Product";

export class FileDto{
    product: Product | undefined;
    file: File | undefined;
}