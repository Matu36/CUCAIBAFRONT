import React, { useState, useEffect } from "react";
import { useAgentes } from "../hooks/useAgentes";
import { useModulos } from "../hooks/useModulos";
import Spinner from "./UI/Spinner";
import Swal from "sweetalert2";
import Select from "react-select";
import { useOperativo } from "../hooks/useOperativo";
import { formatFecha } from "../utils/MesAño";
import { useQueryClient } from "@tanstack/react-query";

const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;

const HonorariosPorAgente = () => {
  const { data, isLoading } = useAgentes().agentesQuery;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFunciones, setSelectedFunciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [refValue, setRefValue] = useState("");
  const [clicked, setClicked] = useState(false);

  const { operativosByRef } = useOperativo(0, refValue, clicked);

  const dataByRef = operativosByRef.data;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setRefValue(newValue);
  };

  const handleBuscarClick = () => {
    console.log(dataByRef);
    setClicked(true);
  };

  useEffect(() => {
    if (dataByRef) {
      setClicked(false);
    }
  }, [dataByRef]);

  // TRAE LA DATA DE LOS AGENTES //
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setOptions(
        data.map((a) => ({
          value: a.id,
          label: `${a.apellido}, ${a.nombre} (DNI: ${a.dni})`,
        }))
      );
    }
  }, [data, isLoading]);

  const [selectValue, setSelectValue] = useState(null);
  const [showError, setShowError] = useState({
    apellido: 0,
  });

  const operativo = {
    id: 829,
  };

  //TRAE LOS MODULOS ACTIVOS POR ID DE OPERATIVO //
  const { modulosActivosQuery } = useModulos(operativo.id);

  const {
    refetch: refetchModulosActivos,
    data: dataModulosActivos,
    isLoading: loadingModulosActivos,
    isFetched: fetchedModulosActivos,
  } = modulosActivosQuery;

  // SELECCIONA LAS FUNCIONES DESDE EL SELECT, LAS MUESTRA PERMITE ELIMINARLAS //

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedText = event.target.options[event.target.selectedIndex].text;

    if (selectedValue === "") {
      return;
    }

    setSelectedFunciones([
      ...selectedFunciones,
      { id: selectedValue, descripcion: selectedText },
    ]);
    setSelectedOption("");
  };

  const handleRemoveFuncion = (id) => {
    const updatedFunciones = selectedFunciones.filter(
      (funcion) => funcion.id !== id
    );
    setSelectedFunciones(updatedFunciones);
  };

  return (
    <div className="honorariosPorAgente">
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
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
        )}
        <br />
        <br />
        <form action="submit">
          {showDropdown && (
            <div className="custom-dropdown">
              <br />
              <p style={{ fontWeight: "bold" }}>
                {selectValue
                  ? `Agente Seleccionado: ${
                      selectValue.label.split(" (DNI:")[0]
                    }`
                  : ""}
              </p>

              <div className="form-group">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  OPERATIVO
                </label>

                <div className="input-group">
                  <input
                    style={{ maxWidth: "40%" }}
                    type="number"
                    placeholder="Introducir número del operativo"
                    onChange={handleInputChange}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-buscar"
                      style={{ marginLeft: "2rem" }}
                      onClick={handleBuscarClick}
                    >
                      Buscar
                    </button>
                  </div>
                </div>
                <br />

                {dataByRef ? (
                  <div className="p-0 mb-3">
                    <div className="card-body justify-content-evenly d-flex gap-2 detalleAgente">
                      <div className="data-row">
                        <div className="value">{dataByRef.referencia}</div>
                        <div className="label">Número de Operativo</div>
                      </div>
                      <div className="data-row">
                        <div className="value">
                          {formatFecha(dataByRef.fecha)}
                        </div>
                        <div className="label"> Fecha</div>
                      </div>
                      <div className="data-row">
                        <div className="value">
                          {dataByRef.descripcion ?? <i>Sin Descripción</i>}
                        </div>
                        <div className="label"> Descripción</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No hay resultados disponibles</p>
                )}
              </div>

              <br />

              <div className="form-group">
                <select
                  style={{ maxWidth: "40%" }}
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="form-select"
                >
                  <option value="">Seleccionar Funciones</option>
                  {dataModulosActivos.map((modulo) => (
                    <option key={modulo.id} value={modulo.id}>
                      {modulo.descripcion}
                    </option>
                  ))}
                </select>
                <div>
                  {selectedFunciones.map((funcion) => (
                    <span key={funcion.id}>
                      {funcion.descripcion}
                      <button
                        className="btn btn-clear"
                        onClick={() => handleRemoveFuncion(funcion.id)}
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <br />
              <br />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <button type="submit" className="btn btn-primary">
                  Crear Honorario
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HonorariosPorAgente;
