import { create } from "zustand";
import { Product } from "../types/product.types";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (updatedProduct: Product) => void;
  removeProduct: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => {
    set({ products });
  },
  addProduct: (product) => {
    set((state) => {
      const updatedProducts = [...state.products, product];
      return { products: updatedProducts };
    });
  },
  updateProduct: (updatedProduct) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      return { products: updatedProducts };
    });
  },
  removeProduct: (id) => {
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.id !== id
      );
      return { products: updatedProducts };
    });
  },
}));
