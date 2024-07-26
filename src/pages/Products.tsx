import React, { useEffect, useState } from "react";
import ProductList from "../components/products/ProductList";
import { useProductStore } from "../store/productStore";
import { fetchProducts } from "../services/api";

const Products: React.FC = () => {
  const { setProducts } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, [setProducts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Products;
