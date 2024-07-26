// src/components/products/ProductDetail.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import Input from "../common/Input";
import { validateForm } from "../../utils/validations";
import { Product } from "../../types/product.types";
import { deleteProductById, updateProductById } from "../../services/api";
import "../../assets/styles/_productDetail.scss";
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct, removeProduct } = useProductStore();
  const navigate = useNavigate();
  const product = products.find((product) => product.id === Number(id));

  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm({ title, price, category, description });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedProduct: Partial<Product> = {
      id: product?.id || 0,
      title,
      price: Number(price),
      category,
      description,
      image: product?.image || "",
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        updatedProduct.image = reader.result as string;
        await updateProductDetails(updatedProduct);
      };
      reader.readAsDataURL(image);
    } else {
      await updateProductDetails(updatedProduct);
    }
  };

  const updateProductDetails = async (updatedProduct: Partial<Product>) => {
    try {
      const updatedProductFromApi = await updateProductById(
        updatedProduct.id!,
        updatedProduct
      );
      updateProduct(updatedProductFromApi);
      navigate(`/products/${updatedProduct.id}`);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProductById(product?.id || 0);
      removeProduct(product?.id || 0);
      navigate("/products");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>Price: {product.price}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-form">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
          </div>
          <div>
            <label>Price:</label>
            <Input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
          </div>
          <div>
            <label>Category:</label>
            <Input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && (
              <p style={{ color: "red" }}>{errors.category}</p>
            )}
          </div>
          <div>
            <label>Description:</label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>
          <div>
            <label>Image:</label>{" "}
            <button className="delete-button" onClick={handleDelete}>
              Delete Product
            </button>
            <input type="file" onChange={handleImageChange} />
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
