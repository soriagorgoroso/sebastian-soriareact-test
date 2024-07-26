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

  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(file.type));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let imageUrl = product?.image || "";
    if (image) {
      imageUrl = await resizeImage(image, 800, 800);
    }

    const newProduct = {
      id: product?.id || Math.random(),
      title,
      price: Number(price),
      category,
      description,
      image: imageUrl,
    };

    if (product) {
      updateProduct(newProduct);
    } else {
      addProduct(newProduct);
    }

    navigate("/products");
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
