import React from "react";
import { SortButtonProps } from "./SortButton.types";

const SortButton: React.FC<SortButtonProps> = ({
  label,
  onClick,
  direction,
}) => {
  return (
    <button className="sort-button" onClick={onClick}>
      {label}{" "}
      {direction === "ascending" ? "▲" : direction === "descending" ? "▼" : ""}
    </button>
  );
};

export default SortButton;
