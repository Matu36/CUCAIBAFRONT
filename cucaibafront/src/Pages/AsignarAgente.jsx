import React from "react";
import GetAgentes from "../components/GetAgentes";
import { useOutletContext } from "react-router-dom";

const AsignarAgente = () => {
  const [row, setRow] = useOutletContext();
  const handleRowChange = (e) => {
    setRow(e.selectedRows[0]);
  };
  return (
    <div>
      <div>
        <h1>Asignar Agente al Operativo</h1>
        <hr />
      </div>
      <GetAgentes
        selectableRows
        selectableRowsNoSelectAll
        selectableRowsSingle
        selectableRowsHighlight
        onSelectedRowsChange={handleRowChange}
      />
    </div>
  );
};

export default AsignarAgente;
