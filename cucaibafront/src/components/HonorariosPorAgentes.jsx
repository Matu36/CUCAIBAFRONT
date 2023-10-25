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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsPersonFill } from "react-icons/bs";
import { HonorariosAPI } from "../api/HonorariosAPI";
import axios from "axios";
import { OperativosAPI } from "../api/OperativosAPI";
import { useNavigate } from "react-router-dom";
import EmptyTable from "./UI/EmptyTable";

const STRING_REGEX = /^[a-zA-Z].*(?:\d| )*$/;

const HonorariosPorAgente = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useAgentes().agentesQuery;
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [refValue, setRefValue] = useState("");
  const [clicked, setClicked] = useState(false);
  const [estaHabilitado, setEstaHabilitado] = useState(false);
  const [operativoData, setOperativoData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    queryClient.removeQueries();
  }, []);

  const handleNavigate = () => {
    navigate("../../agentes/crear-agente");
  };

  //TRAE DATA DE OPERATIVO POR REFERENCIA

  const {
    refetch: validarOperativoRefetch,
    data: dataByRef,
    isFetching: operativoFetching,
    isFetched: operativoFetched,
    isError,
  } = useQuery({
    enabled: false,
    queryKey: ["validar-operativo"],
    queryFn: async () => {
      const { data } = await OperativosAPI.get(
        `/verificar/${refValue}/${selectValue.value.split("|")[0]}`
      );
      return data;
    },
    onSuccess: (data) => {
      setEstaHabilitado(true);
      setOperativoData(data);
      setClicked(false);
      setHonorarioData({ ...honorarioData, operativo_id: data.id });
      refetchModulosActivos();
      Swal.fire({
        title: "Se asoció el agente al operativo",
        text: "El agente esta habilitado a participar en este operativo",
        icon: "success",
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    },
    onError: (data) => {
      Swal.fire({
        title: "Hubo un problema",
        text: `${data.response.data}`,
        icon: "info",
        timer: 3000,
        showCancelButton: false,
        showConfirmButton: false,
      });
      queryClient.removeQueries(["operativoByRef", { refValue: refValue }]);
      setRefValue("");
      setClicked(false);
      setOperativoData({});
      setEstaHabilitado(false);
    },
  });

  const [honorarioData, setHonorarioData] = useState({
    operativo_id: 0,
    agente_id: 0,
    persona_id: 0,
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
    validarOperativoRefetch();
    if (operativoData.referencia != refValue) {
      setOptionsModulos([]);
    }
  };

  // TRAE LA DATA DE LOS AGENTES //
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setOptions(
        data.map((a) => ({
          value: `${a.personaId}|${a.id}`,
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

  //CREAR HONORARIO //

  const crearHonorarioPorAgente = useMutation({
    mutationKey: ["crear-honorarios-agente"],
    mutationFn: async () =>
      await HonorariosAPI.post("/Agente", { ...honorarioData }),

    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se creó el Honorario correctamente",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        window.location.reload();
      });
    },
    onError: () => {
      Swal.fire({
        title: "Hubo un error al crear el Honorario",
        position: "center",
        icon: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#4CAF50",
      });
    },
  });

  /// ACTUALIZAMOS EL ESTADO honorarioData cada vez que se modifica selectedOptiones que es el estado que almacena los módulos (se quedaba con el modulo anterior)

  useEffect(() => {
    const modulosData = selectedOptions.map((o) => o.value);
    const agenteId = parseInt(honorarioData.agente_id, 10);
    setHonorarioData({
      ...honorarioData,
      agente_id: agenteId,
      modulos: modulosData,
    });
  }, [selectedOptions]);

  //Enviamos honorarioData a la ruta
  const handleCreate = () => {
    crearHonorarioPorAgente.mutate(honorarioData);
  };

  // crearHonorarioPorAgente.mutate(honorarioData);

  //FINALIZA LA CREACION DEL HONORARIO

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
                noOptionsMessage={() => (
                  <EmptyTable msg="El agente no se encuentra cargado">
                    <button
                      type="button"
                      className="btn btn-guardar"
                      onClick={handleNavigate}
                    >
                      Crear Agente
                    </button>
                  </EmptyTable>
                )}
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
                  setHonorarioData(() => {
                    let dataAgente = e.value.split("|");
                    return {
                      ...honorarioData,
                      agente_id: dataAgente[1],
                      persona_id: dataAgente[0],
                    };
                  });
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
                      disabled={operativoFetching || !refValue || refValue == 0}
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
                  </div>
                </div>
                <br />

                {operativoData?.id && (
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
                        <div className="value">{operativoData.referencia}</div>
                        <div className="label">Número de Referencia</div>
                      </div>
                      <div className="data-row">
                        <div className="value">
                          {formatFecha(operativoData.fecha)}
                        </div>
                        <div className="label"> Fecha</div>
                      </div>
                      <div className="data-row">
                        <div className="value">
                          {operativoData.descripcion ?? <i>Sin Descripción</i>}
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
                  noOptionsMessage={() => "No hay módulos disponibles"}
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
                    setOperativoData({});
                  }}
                >
                  <FaRedo />
                  Limpiar Campos
                </button>
                <button
                  type="button"
                  className="btn btn-guardar"
                  onClick={() => handleCreate()}
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
