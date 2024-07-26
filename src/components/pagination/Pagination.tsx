import React from "react";
import "../../assets/styles/_pagination.scss";
import { PaginationProps } from "./Pagination.types";

const Pagination: React.FC<PaginationProps> = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
    }

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
      <div className="pagination-container">
        {startPage > 1 && (
          <>
            <li className="page-item">
              <button className="page-button" onClick={() => paginate(1)}>
                1
              </button>
            </li>
            {startPage > 2 && <li className="page-item">...</li>}
          </>
        )}
        {visiblePageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(number)} className="page-button">
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <li className="page-item">...</li>}
            <li className="page-item">
              <button
                onClick={() => paginate(totalPages)}
                className="page-button"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
      </div>
    );
  };

  return (
    <nav>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
