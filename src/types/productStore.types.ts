import { Product } from "./product.types";

export interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  updateProduct: (product: Product) => void;
}
