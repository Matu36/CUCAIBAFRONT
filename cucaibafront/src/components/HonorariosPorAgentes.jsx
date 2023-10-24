import React, { useState, useEffect } from "react";
import { useAgentes } from "../hooks/useAgentes";
import { useModulos } from "../hooks/useModulos";
import Spinner from "./UI/Spinner";
import Swal from "sweetalert2";
import Select from "react-select";
import { useOperativo } from "../hooks/useOperativo";
import { MaskMoneda } from "../utils/Mask";
import { FaEdit, FaRedo, FaSearch } from "react-icons/fa";
import { formatFecha } from "../utils/MesAño";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPersonFill } from "react-icons/bs";
import { HonorariosAPI } from "../api/HonorariosAPI";

const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;

const HonorariosPorAgente = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAgentes().agentesQuery;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [refValue, setRefValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [estaHabilitado, setEstaHabilitado] = useState(false);
  const { operativosByRef } = useOperativo(0, refValue, clicked);
  const [operativoData, setOperativoData] = useState({});

  useEffect(() => {
    queryClient.removeQueries();
  }, []);

  //TRAE DATA DE OPERATIVO POR REFERENCIA

  const {
    data: dataByRef,
    isFetching: operativoFetching,
    isError,
    refetch,
  } = operativosByRef;

  const [honorarioData, setHonorarioData] = useState({
    operativo_id: 0,
    agente_id: 0,
    modulos: [],
  });

  // FINALIZA LA CREACION DEL HONORARIO //

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setRefValue(newValue);
    if (newValue.length <= 0) {
      setSelectedOptions([]);
      setEstaHabilitado(false);
      queryClient.removeQueries([
        "operativoByRef",
        { refValue: operativoData.referencia },
      ]);
    }
  };

  // BUSCA POR REFERENCIA DE OPERATIVO

  const handleBuscarClick = () => {
    setClicked(true);
    if (operativoData.referencia != refValue) {
      setOptionsModulos([]);
    }
    refetch();
  };

  useEffect(() => {
    if (dataByRef) {
      setClicked(false);
      setOperativoData(dataByRef);
      setHonorarioData({ ...honorarioData, operativo_id: operativoData.id });
      refetchModulosActivos();
    }
  }, [dataByRef]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Hubo un error",
        html: `<p>No se encontro el Operativo con referencia: <b># ${refValue}</b></p>`,
        showCancelButton: false,
        timer: 4000,
        showConfirmButton: false,
        icon: "error",
      });
      queryClient.removeQueries(["operativoByRef", { refValue: refValue }]);
      setRefValue("");
      setClicked(false);
    }
  }, [isError]);

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

  //TRAE LOS MODULOS ACTIVOS POR ID DE OPERATIVO //
  const { modulosActivosQuery } = useModulos(operativoData?.id);

  const {
    refetch: refetchModulosActivos,
    data: dataModulosActivos,
    isLoading: loadingModulosActivos,
    isFetched: fetchedModulosActivos,
  } = modulosActivosQuery;

  // SELECCIONA LAS FUNCIONES DESDE EL SELECT, LAS MUESTRA PERMITE ELIMINARLAS //

  const [optionsModulos, setOptionsModulos] = useState([]);
  useEffect(() => {
    if (!loadingModulosActivos) {
      typeof dataModulosActivos == "object" &&
        setOptionsModulos([
          ...optionsModulos,
          ...dataModulosActivos.map((m) => ({
            value: m.id,
            label: `${m.descripcion} ($${MaskMoneda(`${m.valor}`)})`,
          })),
        ]);
    }
  }, [fetchedModulosActivos, loadingModulosActivos, dataModulosActivos]);

  const handleAsociar = () => {
    setEstaHabilitado(true);
    Swal.fire({
      title: "Se asoció el agente al operativo",
      text: "El agente esta habilitado a participar en este operativo",
      icon: "success",
      timer: 3000,
      showCancelButton: false,
      showConfirmButton: false,
    });
  };

  //CREAR HONORARIO //
  const crearHonorarioPorAgente = useMutation(
    async (data) => {
      return await HonorariosAPI.post("Agente", { data });
    },
    {
      onSuccess: () => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se creó el Honorario correctamente",
          showConfirmButton: false,
          timer: 3000,
        });
      },
    }
  );

  const handleCreateHonorario = async () => {
    const updatedHonorarioData = {
      ...honorarioData,
      modulos: [].concat(
        selectedOptions.map((o) => ({
          id: o.value,
        }))
      ),
    };

    await crearHonorarioPorAgente.mutate(updatedHonorarioData);

    //
    console.log(updatedHonorarioData);
  };

  // const handleCreate = () => {
  //   setHonorarioData({
  //     ...honorarioData,
  //     modulos: [].concat(
  //       selectedOptions.map((o) => ({
  //         id: o.value,
  //       }))
  //     ),
  //   });
  //   console.log(honorarioData);
  // };

  return (
    <div className="honorariosPorAgente">
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          !selectValue && (
            <div>
              <h5>Buscar agente</h5>
              <Select
                id="select-agentes"
                options={options}
                value={selectValue}
                placeholder="Seleccionar Agente por Apellido o DNI"
                noOptionsMessage={() => "El agente no se encuentra cargado"}
                classNamePrefix="select2"
                classNames={{ container: () => "select2-container" }}
                onInputChange={(e) => {
                  setEstaHabilitado(false);
                  setRefValue("");
                  setClicked(false);
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
                  setHonorarioData({ ...honorarioData, agente_id: e.value });
                  setShowDropdown(true);
                  setEstaHabilitado(false);
                  queryClient.removeQueries(["operativoByRef"]);
                  setRefValue("");
                  setClicked(false);
                }}
              />
            </div>
          )
        )}
        <form action="submit">
          {showDropdown && !isLoading && (
            <div className="custom-dropdown p-0 rounded-1">
              <div
                className=" d-flex align-items-center justify-content-start p-2"
                style={{
                  height: "50px",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,.1)",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <BsPersonFill size="1.5rem" />
                <p style={{ fontWeight: "bold" }} className="m-0">
                  {selectValue ? `${selectValue.label.split(" (DNI:")[0]}` : ""}
                </p>
              </div>

              <div className="form-group p-2">
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
                    onChange={handleInputChange}
                    className="form-control"
                    value={refValue}
                    min={0}
                  />
                  <div className="input-group-append d-flex gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-buscar d-flex align-items-center justify-content-center gap-2 ml-2"
                      style={{ zIndex: 0 }}
                      onClick={handleBuscarClick}
                      disabled={
                        operativoFetching ||
                        !refValue ||
                        refValue == 0 ||
                        dataByRef
                      }
                    >
                      {operativoFetching ? (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        <FaSearch />
                      )}
                      Buscar
                    </button>
                    {dataByRef && (
                      <button
                        type="button"
                        className="btn btn-outline-info"
                        style={{ zIndex: 0 }}
                        onClick={handleAsociar}
                        disabled={estaHabilitado}
                      >
                        Asociar Operativo
                      </button>
                    )}
                  </div>
                </div>
                <br />

                {dataByRef && (
                  <div className="p-0 mb-3 card">
                    <div className="card-header">
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginLeft: "0.5rem",
                        }}
                      >
                        Datos del operativo
                      </label>
                    </div>
                    <div className="card-body justify-content-evenly d-flex gap-2 detalleAgente">
                      <div className="data-row">
                        <div className="value">{dataByRef.referencia}</div>
                        <div className="label">Número de Referencia</div>
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
                      <br />
                    </div>
                  </div>
                )}
              </div>

              <br />

              <div className="form-group p-2">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginLeft: "0.5rem",
                  }}
                >
                  Seleccione M&oacute;dulos:
                </label>
                <Select
                  isMulti
                  name="modulos"
                  options={optionsModulos}
                  classNames={{ container: () => "select2-container" }}
                  placeholder="Seleccioné una opción"
                  classNamePrefix="select2"
                  id="select-modulos"
                  isDisabled={!estaHabilitado}
                  value={selectedOptions}
                  onChange={(e) => {
                    setSelectedOptions(e);
                  }}
                />
              </div>
              <br />
              <br />
              <div className="d-flex align-items-center justify-content-between p-2">
                <button
                  type="button"
                  className="btn btn-limpiar d-flex gap-2 align-items-center"
                  onClick={() => {
                    setSelectValue(null);
                    setShowDropdown(false);
                  }}
                >
                  <FaRedo />
                  Limpiar Campos
                </button>
                <button
                  type="button"
                  className="btn btn-guardar"
                  onClick={() => handleCreateHonorario()}
                  disabled={selectedOptions.length == 0}
                >
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
