import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import { Product } from "../../types/product.types";
import Button from "../common/Button";
import Input from "../common/Input";
import "../../assets/styles/_productForm.scss";

const ProductForm: React.FC<{ product?: Product }> = ({ product }) => {
  const { addProduct, updateProduct } = useProductStore();
  const navigate = useNavigate();
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price.toString() || "");
  const [category, setCategory] = useState(product?.category || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = "Title is required";
    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(price))) {
      newErrors.price = "Price must be a number";
    }
    if (!category) newErrors.category = "Category is required";
    if (!description) newErrors.description = "Description is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newProduct: Product = {
      id: product?.id || Date.now(),
      title,
      price: Number(price),
      category,
      description,
      image: image ? URL.createObjectURL(image) : product?.image || "",
    };

    try {
      if (product) {
        await updateProduct(newProduct);
      } else {
        await addProduct(newProduct);
      }
      navigate("/products");
    } catch (error) {}
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="product-form-container">
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            label="Title"
            error={errors.title}
          />
          <Input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            label="Price"
            error={errors.price}
          />
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter product category"
            label="Category"
            error={errors.category}
          />
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            label="Description"
            error={errors.description}
          />
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <Button
            text={product ? "Update Product" : "Create Product"}
            type="submit"
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
