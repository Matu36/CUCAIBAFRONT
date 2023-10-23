import React, { useState, useEffect } from "react";
import { useAgentes } from "../hooks/useAgentes";
import { useModulos } from "../hooks/useModulos";
import Spinner from "./UI/Spinner";
import Swal from "sweetalert2";
import Select from "react-select";
import { useOperativo } from "../hooks/useOperativo";
import { MaskMoneda } from "../utils/Mask";
import { FaSearch } from "react-icons/fa";

const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;

const HonorariosPorAgente = () => {
  const { data, isLoading } = useAgentes().agentesQuery;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFunciones, setSelectedFunciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const refValue = 45678;

  const { operativosByRef } = useOperativo(0, refValue);

  if (operativosByRef.isSuccess) {
    const dataByRef = operativosByRef.data;

    console.log(dataByRef);
  }

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

  const [optionsModulos, setOptionsModulos] = useState([
    { value: "0|0", label: "Elegí una opción" },
  ]);
  useEffect(() => {
    if (!loadingModulosActivos) {
      typeof dataModulosActivos == "object" &&
        setOptionsModulos([
          ...options,
          ...dataModulosActivos.map((m) => ({
            value: m.id,
            label: `${m.descripcion} ($${MaskMoneda(`${m.valor}`)})`,
          })),
        ]);
    }
  }, [fetchedModulosActivos, loadingModulosActivos]);

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

                <div className="input-group gap-4">
                  <input
                    style={{ maxWidth: "40%" }}
                    type="number"
                    placeholder="Introducir número del operativo"
                    // value={operativo.id}
                    // onChange={handleOperativoChange}
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-buscar d-flex align-items-center justify-content-center gap-2 ml-2"
                      style={{ zIndex: 0 }}
                    >
                      <FaSearch />
                      Buscar
                    </button>
                  </div>
                </div>
              </div>

              <br />

              <div className="form-group">
                <Select
                  isMulti
                  name="modulos"
                  options={optionsModulos}
                  classNames={{ container: () => "select2-container" }}
                  placeholder="Seleccioné una opción"
                  classNamePrefix="select2"
                  id="select-modulos"
                  isDisabled={!operativosByRef.data}
                />
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
