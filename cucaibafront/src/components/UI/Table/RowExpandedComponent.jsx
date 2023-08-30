import React, { useState, useEffect } from "react";
import { useHonorarios } from "../../../hooks/useHonorarios";
import { usePagination } from "../../../hooks/usePagination";
import Modal from "../Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useOperativo } from "../../../hooks/useOperativo";
import PostHonorarios from "../../PostHonorarios";
import { useMutation } from "@tanstack/react-query";
import { HonorariosAPI } from "../../../api/HonorariosAPI";
import DataTable from "react-data-table-component";
import { useAgentes } from "../../../hooks/useAgentes";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useModulos } from "../../../hooks/useModulos";
import EmptyTable from "../../UI/EmptyTable";

// Se usa en el componente TablaHonorarios al hacer click en los operativos.

const RowExpandedComponent = ({ data: operativo }) => {
  const { paginationOptions } = usePagination();

  const columns = [
    { name: "DNI", selector: (row) => row.dni, sortable: true },
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    {
      name: "Tipo de Pago",
      selector: (row) => (row.tipo_pago == "ch" ? "Cheque" : "Transferencia"),
      sortable: true,
    },
  ];

  //TRAE DATA DE AGENTES DISPONIBLES POR OPERATIVO Y EL REFETCH PARA CUANDO SE CREA EL HONORARIO //

  const { data: agentesDisponibles, refetch: refetchAgentesDisponibles } =
    useAgentes(operativo.id || 0).agentesDisponiblesQuery;

  // REFETCH DE MODULOS ACTIVOS CUANDO SE CREA EL HONORARIO

  const { refetch: refetchModulosActivos } = useModulos(
    operativo.id
  ).modulosActivosQuery;

  const {
    data: agentes,
    isLoading: loadingAgentes,
    refetch: refetchAgentes,
  } = useOperativo(operativo.id).agentesOperativoQuery;

  const [honorarioData, setHonorarioData] = useState({
    operativo_id: operativo.id,
    agente_id: 0,
    modulo_id: 0,
  });

  const {
    data: honorariosAgente,
    isLoading: honorariosLoading,
    isFetching,
    refetch,
  } = useHonorarios(
    operativo.id,
    honorarioData.agente_id
  ).honorariosAgenteQuery;

  // FUNCION PARA CREAR EL HONORARIO POR OPERATIVO, SE ELIGE AGENTE Y MODULO //

  const mutation = useMutation(
    async (newHonorario) => {
      return await HonorariosAPI.post("", newHonorario);
    },
    {
      onSuccess: () => {
        refetch();
        refetchAgentes();
        refetchAgentesDisponibles();
        refetchModulosActivos();
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Se creó el honorario de manera correcta",
          showConfirmButton: false,
          timer: 3000,
        });
      },
      onError: (err) => {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: "Hubo un error",
          text: err.response.data,
          showConfirmButton: true,
          timer: 3000,
        });
      },
    }
  );

  //DESVINCULAR AGENTE DEL OPERATIVO //

  const deleteH = useMutation(
    async (data) => {
      return await HonorariosAPI.delete("", { data });
    },
    {
      onSuccess: () => {
        refetch();
        refetchAgentes();
        refetchAgentesDisponibles();
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Se desvinculo el agente del operativo de manera correcta",
          showConfirmButton: false,
          timer: 3000,
        });
      },
    }
  );

  const handleDelete = (agente_id, operativo_id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción desvinculará al agente del operativo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desvincular",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteH.mutate({ agenteID: agente_id, operativoID: operativo_id });
      }
    });
  };

  // FINALIZACION DESVINCULAR AGENTE DEL OPERATIVO //

  const handleClick = (id) => {
    setHonorarioData({ ...honorarioData, agente_id: id });
    refetch();
  };

  const handleChangeModuloId = (id) => {
    setHonorarioData({ ...honorarioData, modulo_id: id });
  };

  const crearHonorario = () => {
    if (
      honorarioData.agente_id == 0 ||
      honorarioData.modulo_id == 0 ||
      honorarioData.operativo_id == 0
    ) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, no se pudo crear el honorario",
        showConfirmButton: true,
      });
      return;
    }
    mutation.mutate({ ...honorarioData, fechaModif: new Date() });
  };

  const agregarAgente = () => {
    crearHonorario();
  };

  const handleSelectChange = (e) => {
    if (e.selectedCount > 0) {
      setHonorarioData({ ...honorarioData, agente_id: e.selectedRows[0].id });
    } else {
      setHonorarioData({ ...honorarioData, agente_id: 0 });
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("../../agentes/crear-agente");

    let modalEl = document.getElementById("agregarAgenteModal");
    let modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();
  };

  //-------------------------------- SEARCHBAR --------------------------- //

  const [search, setSearch] = useState("");
  const [filteredAgentes, setFilteredAgentes] = useState(agentesDisponibles);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    setFilteredAgentes(agentesDisponibles);
    setIsFetched(true);
  }, [agentesDisponibles]);

  useEffect(() => {
    filterByDni(search);
  }, [search]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const filterByDni = (value) => {
    if (!value) {
      setFilteredAgentes(agentesDisponibles);
    } else {
      const filteredAgents = agentesDisponibles.filter(
        (agent) =>
          agent.dni && agent.dni.toString().includes(value.toLowerCase())
      );
      setFilteredAgentes(filteredAgents);
    }
  };

  //-------------------------------- FIN SEARCHBAR --------------------------- //

  return (
    <>
      <Modal title="Agregar función al Agente" referenceID="formModal">
        <div className="p-3">
          <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
            Modulos Activos del Agente
          </h5>
          <hr />
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              {honorariosLoading && isFetching && (
                <tr>
                  <td colSpan={2}>Cargando...</td>
                </tr>
              )}
              {typeof honorariosAgente == "object" &&
                honorariosAgente.map((h) => (
                  <tr key={h.id}>
                    <td>{h.modulo.descripcion}</td>
                    <td>$ {h.valor}</td>
                  </tr>
                ))}
              {!honorariosLoading && honorariosAgente == 400 && (
                <tr>
                  <td colSpan={2}>No hay ningún modulo pendiente</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PostHonorarios
          handleModuloId={handleChangeModuloId}
          handleClick={crearHonorario}
          operativoId={operativo.id}
        />
      </Modal>
      <Modal
        title={`Agregar Agente al Operativo: ${operativo.referencia}`}
        referenceID="agregarAgenteModal"
      >
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por DNI"
            onChange={handleOnChange}
            value={search}
            autoComplete="off"
          />
          <div>
            {typeof filteredAgentes === "object" ? (
              <DataTable
                columns={columns}
                data={filteredAgentes}
                pagination
                selectableRows
                selectableRowsSingle
                selectableRowsHighlight
                onSelectedRowsChange={handleSelectChange}
                striped
                paginationComponentOptions={paginationOptions}
                noDataComponent={
                  <EmptyTable msg="No se encontro el Agente con los datos ingresados" />
                }
              />
            ) : (
              <div className="d-flex p-2 align-items-center justify-content-center gap-2">
                <h5>No hay ningun agente disponible</h5>
                <button
                  type="button"
                  className="btn btn-guardar"
                  onClick={handleNavigate}
                >
                  Crear Agente
                </button>
              </div>
            )}
          </div>
        </div>
        <PostHonorarios
          handleModuloId={handleChangeModuloId}
          handleClick={agregarAgente}
          disabled={!honorarioData.agente_id}
          operativoId={operativo.id}
        />
      </Modal>
      <div>
        <div className="p-3">
          <div className="agentes-container">
            <div>
              <div className="d-flex align-items-center justify-content-between">
                <h5 style={{ color: "#5DADE2" }}>
                  Agentes asociados al Operativo
                </h5>
                <div></div>
                <button
                  type="btn"
                  className="btn btn-outline-guardar"
                  data-bs-toggle="modal"
                  data-bs-target="#agregarAgenteModal"
                >
                  <AiOutlinePlus /> Agregar Agente
                </button>
              </div>
              <hr />
            </div>
            <div className="p-3">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">CUIL</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                {loadingAgentes && (
                  <tbody>
                    <tr>
                      <td colSpan={4}>Cargando...</td>
                    </tr>
                  </tbody>
                )}
                {!loadingAgentes && typeof agentes === "object" ? (
                  <tbody>
                    {agentes.map((agente) => (
                      <tr key={agente.persona_id}>
                        <td>{agente.apellido}</td>
                        <td>{agente.nombre}</td>
                        <td>{agente.cuil}</td>
                        <td className="d-flex gap-3">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                            onClick={() => {
                              handleClick(agente.id);
                            }}
                          >
                            <AiOutlinePlus /> Agregar Función
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                              handleDelete(agente.id, operativo.id)
                            }
                          >
                            <FiTrash /> Eliminar Agente
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  !loadingAgentes && (
                    <tbody>
                      <tr>
                        <td colSpan={4}>
                          No hay ningún Agente Asociado al Operativo
                        </td>
                      </tr>
                    </tbody>
                  )
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RowExpandedComponent;
