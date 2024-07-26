import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import Pagination from "../pagination/Pagination";
import SortButton from "../common/SortButton";
import { Product } from "../../types/product.types";
import "..//../assets/styles/_productList.scss";
const ProductList: React.FC = () => {
  const { products } = useProductStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "ascending" | "descending" | null;
  }>({ key: "title", direction: null });

  const sortProducts = (
    products: Product[],
    key: keyof Product,
    direction: "ascending" | "descending" | null
  ) => {
    if (!direction) return products;
    return [...products].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) {
        return direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };
  const getFilteredProducts = () => {
    let filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sortConfig.direction !== null) {
      filteredProducts = sortProducts(
        filteredProducts,
        sortConfig.key,
        sortConfig.direction
      );
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const requestSort = (key: keyof Product) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = null;
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const handleRowClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-list-container">
      <input
        type="text"
        placeholder="Search products"
        value={search}
        onChange={handleSearchChange}
      />
      <table className="product-table">
        <thead>
          <tr>
            <th>
              <SortButton
                label="Title"
                onClick={() => requestSort("title")}
                direction={
                  sortConfig.key === "title" ? sortConfig.direction : null
                }
              />
            </th>
            <th>
              <SortButton
                label="Price"
                onClick={() => requestSort("price")}
                direction={
                  sortConfig.key === "price" ? sortConfig.direction : null
                }
              />
            </th>
            <th>
              <SortButton
                label="Category"
                onClick={() => requestSort("category")}
                direction={
                  sortConfig.key === "category" ? sortConfig.direction : null
                }
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} onClick={() => handleRowClick(product.id)}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
