import { useState } from "react";
import { useHonorarios } from "../../../hooks/useHonorarios";
import { usePagination } from "../../../hooks/usePagination";
import Modal from "../Modal";
import { FormHonorario } from "../../FormHonorario";
import { AiOutlinePlus } from "react-icons/ai";
import { useOperativo } from "../../../hooks/useOperativo";
import PostHonorarios from "../../PostHonorarios";
import { useMutation } from "@tanstack/react-query";
import { HonorariosAPI } from "../../../api/HonorariosAPI";
import DataTable from "react-data-table-component";
import { useAgentes } from "../../../hooks/useAgentes";

const RowExpandedComponent = ({ data: operativo }) => {
  const { paginationOptions } = usePagination();

  const columns = [
    { name: "Apellido", selector: (row) => row.apellido, sortable: true },
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "CBU", selector: (row) => row.cbu, sortable: true },
    { name: "CUIL", selector: (row) => row.cuil, sortable: true },
  ];

  const { data: agentesDisponibles, refetch: refetchAgentesDisponibles } =
    useAgentes(operativo.id || 0).agentesDisponiblesQuery;

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
    isError,
    refetch,
  } = useHonorarios(
    operativo.id,
    honorarioData.agente_id
  ).honorariosAgenteQuery;

  const mutation = useMutation(async (newHonorario) => {
    return await HonorariosAPI.post("", newHonorario);
  });

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
      alert("No se puede crear un honorario si falta algun campo");
      return;
    }
    mutation.mutate({ ...honorarioData, fechaModif: new Date() });
    refetch();
  };

  const agregarAgente = () => {
    crearHonorario();
    refetchAgentes();
    refetchAgentesDisponibles();
  };

  const handleSelectChange = (e) => {
    if (e.selectedCount > 0) {
      setHonorarioData({ ...honorarioData, agente_id: e.selectedRows[0].id });
    } else {
      setHonorarioData({ ...honorarioData, agente_id: 0 });
    }
  };

  return (
    <>
      <Modal title="Agregar función al Agente" referenceID="formModal">
        <div className="p-3">
          <h4 className="subtitulo" style={{ color: "#5DADE2" }}>
            Modulos Pendientes del Agente
          </h4>
          <hr />
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              {honorariosLoading && (
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
        title="Agregar Agente al Operativo"
        referenceID="agregarAgenteModal"
      >
        <div>
          <div>
            <h5 className="subtitulo" style={{ color: "#5DADE2" }}>
              Agentes Disponibles
            </h5>
            <hr />
            <DataTable
              columns={columns}
              data={agentesDisponibles}
              pagination
              selectableRows
              selectableRowsSingle
              selectableRowsHighlight
              onSelectedRowsChange={handleSelectChange}
              striped
              paginationComponentOptions={paginationOptions}
            />
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
                  className="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#agregarAgenteModal"
                >
                  Agregar Agente
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
                        <td>
                          <button
                            type="button"
                            className="btn btn-success btn-md"
                            data-bs-toggle="modal"
                            data-bs-target="#formModal"
                            onClick={() => {
                              handleClick(agente.id);
                            }}
                          >
                            <AiOutlinePlus /> Agregar Función
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={4}>
                        No hay ningún Agente Asociado al Operativo
                      </td>
                    </tr>
                  </tbody>
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
