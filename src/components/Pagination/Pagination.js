import React from 'react'

const Pagination = ({ projectPerPage, totalProject, paginate, currentPage }) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalProject / projectPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination">        
            {pageNumbers.map(number => (
                <li className="page-number">
                    <ul key={number} onClick={() => paginate(number)}
                        className={currentPage === number ? "page-link active" : "page-link"}>
                        {number}
                    </ul>
                </li>
            ))}
        </div>
    )
}

export default Pagination