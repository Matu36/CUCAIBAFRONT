import { useState } from "react";

//PAGINACION DATATABLE

export const usePagination = (primerArreglo) => {
  // Hook personalizado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Función para cambiar la página actual

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para cambiar la cantidad de filas por página
  const handlePerRowsChange = (perPage, page) => {
    setCurrentPage(page);
    setPerPage(perPage);
  };

  // Opciones de configuración de paginación
  const paginationOptions = {
    paginationServer: false,
    paginationTotalRows: primerArreglo ? primerArreglo.length : 0,
    paginationDefaultPage: currentPage,
    paginationPerPage: perPage,
    paginationRowsPerPageOptions: [10, 25, 50, 100],
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handlePerRowsChange,
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItemText: "Todos",
  };

  return { paginationOptions };
};
