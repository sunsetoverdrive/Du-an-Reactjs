import React from "react";
import { Link } from "react-router-dom";

const PaginationProductComments = ({ pages, id }) => {
  const { total, totalPages, currentPage, next, prev, hasNext, hasPrev } =
    pages;
  console.log(pages);
  const formatUrl = (page) => {
    return `/Product-${id}?page=${page}`;
  };
  const clickPage = (e, page) => {
    if (page === "...") return e.preventDefault();
  };
  const renderPagesHtml = (delta = 2) => {
    const pagesHtml = [];
    const left = currentPage - delta;
    const right = currentPage + delta;
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === currentPage ||
        i === totalPages ||
        (i <= right && i >= left)
      ) {
        pagesHtml.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pagesHtml.push("...");
      }
    }
    return pagesHtml;
  };

  return (
    <ul className="pagination">
      {hasPrev && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(prev)}>
            Trang trước
          </Link>
        </li>
      )}
      {renderPagesHtml().map((item, index) => (
        <li
          key={index}
          className={`page-item ${item === currentPage ? "active" : ""}`}
        >
          <Link
            onClick={(e) => clickPage(e, item)}
            className="page-link"
            to={formatUrl(item)}
          >
            {item}
          </Link>
        </li>
      ))}
      {hasNext && (
        <li className="page-item">
          <Link className="page-link" to={formatUrl(next)}>
            Trang sau
          </Link>
        </li>
      )}
    </ul>
  );
};

export default PaginationProductComments;
