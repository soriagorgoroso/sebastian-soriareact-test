import { ValidationFormProps } from "../types/utils.types";

export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const isValidLength = password.length >= 6 && password.length <= 12;
  return (
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar &&
    isValidLength
  );
};

export const validateForm = ({
  title,
  price,
  category,
  description,
}: ValidationFormProps) => {
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
