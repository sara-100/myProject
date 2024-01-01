import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4 py-2 mt-20 border bg-gray-200 hover:bg-gray-300 ${currentPage === i ? 'bg-teal-600 text-white' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center">
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;

