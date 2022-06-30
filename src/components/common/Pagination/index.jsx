import React from 'react';
import './index.scss';

const Pagination = ({ handleCurrentPage, currentPage, pages }) => {
  const renderPagination = () => {
    return pages.map((page) => (
      <li key={page} className={`${currentPage === page ? 'active' : ''}`}>
        <button
          onClick={() => handleCurrentPage(page)}
        >
          {page}
        </button>
      </li>
    ));
  };

  return (
    <div className="pagination">
      <ul>
        <li className={`${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            onClick={() => handleCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {renderPagination()}
        <li className={`${currentPage === pages.length ? 'disabled' : ''}`}>
          <button
            onClick={() => handleCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
