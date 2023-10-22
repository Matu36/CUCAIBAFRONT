import React, { useState } from "react";
import { useAgentes } from "../hooks/useAgentes";
import Swal from "sweetalert2";
import Select from "react-select";

const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;

const HonorariosPorAgente = () => {
  const { data, isLoading } = useAgentes().agentesQuery;
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState(
    data.map((a) => ({
      value: a.id,
      label: `${a.apellido}, ${a.nombre} (DNI: ${a.dni})`,
    }))
  );

  const [selectValue, setSelectValue] = useState(null);
  const [showError, setShowError] = useState({
    apellido: 0,
  });

  return (
    <div className="honorariosPorAgente">
      <div>
        <Select
          options={options}
          value={selectValue}
          placeholder="Seleccionar Agente por Apellido o DNI"
          noOptionsMessage={() => "El agente no se encuentra cargado"}
          classNamePrefix="select2"
          classNames={{ container: () => "select2-container" }}
          onInputChange={(e) => {
            if (e.length > 0) {
              let result = 0;

              if (e.endsWith(" ") || !STRING_REGEX.test(e)) {
                result = 2;
              }

              setShowError({
                ...showError,
                apellido: result,
              });
            }
          }}
          onChange={(e) => {
            setSelectValue(e);
            setShowDropdown(true);
          }}
        />
        {showDropdown && (
          <div className="custom-dropdown">
            <br />
            <p>
              {selectValue
                ? `Agente Seleccionado: ${selectValue.label.split(" (DNI:")[0]}`
                : ""}
            </p>

            <div className="form-group">
              <label>Introducir Número del Operativo</label>
              <div className="input-group">
                <input
                  style={{ maxWidth: "30%" }}
                  type="number"
                  // value={numeroOperativo}
                  // onChange={handleOperativoChange}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    className="btn btn-buscar"
                    style={{ marginLeft: "1rem" }}
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            <br />

            <div className="form-group">
              <label>Seleccionar funciones</label>
              <select
                style={{ maxWidth: "30%" }}
                // value={funciones}
                // onChange={handleFuncionesChange}
                className="form-select"
              >
                <option value="funcion1">Función 1</option>
                <option value="funcion2">Función 2</option>
                <option value="funcion3">Función 3</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HonorariosPorAgente;
