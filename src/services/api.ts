import { Product } from "../types/product.types";

const API_BASE_URL = "https://fakestoreapi.com";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return handleResponse(response);
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  return handleResponse(response);
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
  return handleResponse(response);
};

export const deleteProductById = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
  await handleResponse(response);
};
