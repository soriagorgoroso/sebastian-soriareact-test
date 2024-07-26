import React from "react";
import { InputProps } from "./Input.types";
import "../../assets/styles/_input.scss";
const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
}) => {
  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input
        className="custom-input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
