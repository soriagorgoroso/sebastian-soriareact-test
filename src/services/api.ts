import { Product } from "../types/product.types";

const API_BASE_URL = "https://fakestoreapi.com";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const updateProductById = async (
  id: number,
  updatedProduct: Partial<Product>
): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const deleteProductById = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
