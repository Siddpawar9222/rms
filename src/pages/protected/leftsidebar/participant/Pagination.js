import React from 'react';

const Pagination = ({ paginationData, handlePageChange }) => {

    const { pageSize, pageNumber, totalElements, totalPages, lastPage, firstPage } = paginationData;

    return (
        <nav className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-1 items-center ${totalElements > 0 ? "flex" : "hidden"
            }`} aria-label="Pagination">

            <div className="flex-1 text-gray-700 dark:text-gray-300">
                Showing {pageNumber + 1} to {totalPages} of {totalElements} entries
            </div>

            <select className="select select-bordered w-50 max-w-xs"
                onChange={(e) => handlePageChange({ pageSize: e.target.value })}
            >
                <option value={3}>Show 3</option>
                <option value={10}>Show 10</option>
                <option value={15}>Show 15</option>
            </select>

            <div className="flex items-center space-x-2">

                <div className="join grid grid-cols-2">
                    <button
                        className={`join-item btn btn-outline ${firstPage ? "btn-disabled" : ""}`}
                        onClick={() => !firstPage && handlePageChange({ pageNumber: pageNumber - 1 })}
                        disabled={firstPage}
                    >
                        «
                    </button>
                    <button
                        className={`join-item btn btn-md btn-outline ${lastPage ? "btn-disabled" : ""}`}
                        onClick={() => !lastPage && handlePageChange({ pageNumber: pageNumber + 1 })}
                        disabled={lastPage}
                    >
                        »
                    </button>
                </div>


            </div>
        </nav>
    );
};

export default Pagination;