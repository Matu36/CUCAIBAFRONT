import React from "react";

export default function Paginacion(props) {
  const { numberOfPage, currentPage, handlePageNumber } = props;

  const handleClick = (pageNumber) => {
    handlePageNumber(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= numberOfPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((pageNumber) => (
      <button
        key={pageNumber}
        className={currentPage === pageNumber ? "active" : ""}
        onClick={() => handleClick(pageNumber)}
      >
        {pageNumber}
      </button>
    ));
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPage;
  const hasMultiplePages = numberOfPage > 1;

  return (
    <div className="pagination justify-content-center">
      <button
        className={`btn btn-success ${isFirstPage || !hasMultiplePages ? 'disabled' : ''}`}
        onClick={() => handleClick(1)}
      >
        Primera
      </button>

      <button
        className={`btn btn-success ${isFirstPage || !hasMultiplePages ? 'disabled' : ''}`}
        onClick={() => handleClick(currentPage - 1)}
      >
        Anterior
      </button>

      {renderPageNumbers()}

      <button
        className={`btn btn-success ${isLastPage || !hasMultiplePages ? 'disabled' : ''}`}
        onClick={() => handleClick(currentPage + 1)}
      >
        Siguiente
      </button>

      <button
        className={`btn btn-success ${isLastPage || !hasMultiplePages ? 'disabled' : ''}`}
        onClick={() => handleClick(numberOfPage)}
      >
        Última
      </button>
    </div>
  );
  };
