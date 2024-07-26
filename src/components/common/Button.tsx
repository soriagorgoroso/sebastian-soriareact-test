import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className="custom-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
