import { useState } from "react";

export const usePagination = (primerArreglo) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    const handlePerRowsChange = (perPage, page) => {
        setCurrentPage(page);
        setPerPage(perPage);
    };
    
    const paginationOptions = {
        paginationServer: false,
        paginationTotalRows: primerArreglo ? primerArreglo.length : 0,
        paginationDefaultPage: currentPage,
        paginationPerPage: perPage,
        paginationRowsPerPageOptions: [10, 25, 50, 100],
        onChangePage: handlePageChange,
        onChangeRowsPerPage: handlePerRowsChange,
    };

    return {paginationOptions};
}