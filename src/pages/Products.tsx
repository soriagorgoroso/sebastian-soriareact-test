import React, { useEffect, useState } from "react";
import ProductList from "../components/products/ProductList";
import { useProductStore } from "../store/productStore";

const Products: React.FC = () => {
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        try {
          const response = await fetch("https://fakestoreapi.com/products");
          const data = await response.json();
          console.log("Fetched products:", data);
          setProducts(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };

      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [setProducts, products.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <ProductList />
    </div>
  );
};

export default Products;
