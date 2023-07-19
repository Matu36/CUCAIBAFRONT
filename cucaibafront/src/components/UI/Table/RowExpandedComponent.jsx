import { useState } from "react";
import { useHonorarios } from "../../../hooks/useHonorarios";
import Modal from "../Modal";

import { FormHonorario } from "../../FormHonorario";
import { AiOutlinePlus } from "react-icons/ai";
import { useOperativo } from "../../../hooks/useOperativo";

const RowExpandedComponent = ({ data: operativo }) => {
  const { data: agentes, isLoading: loadingAgentes } = useOperativo(
    operativo.id
  ).agentesOperativoQuery;

  const [modalData, setModalData] = useState({
    operativoID: operativo.id,
    agenteID: 0,
  });

  const {
    data: honorariosAgente,
    isLoading: honorariosLoading,
    isError,
    refetch,
  } = useHonorarios(operativo.id, modalData.agenteID).honorariosAgenteQuery;

  const handleClick = (id) => {
    setModalData({ ...modalData, agenteID: id });
    refetch();
  };
  return (
    <>
      <Modal
        title="Agregar función al Agente"
        data={modalData}
        referenceID="formModal"
      >
        <div className="p-3">
          <h4>Modulos Pendientes del Agente</h4>
          <hr />
          <table className="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Descripción</th>
                <th scope="col">Valor</th>
              </tr>
            </thead>
            <tbody>
              {typeof honorariosAgente == "object" &&
                honorariosAgente.map((h) => (
                  <tr key={h.id}>
                    <td>{h.modulo.descripcion}</td>
                    <td>$ {h.valor}</td>
                  </tr>
                ))}
              {honorariosLoading && (
                <tr>
                  <td colSpan={2}>Cargando...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <FormHonorario />
      </Modal>
      <div>
        <div className="p-3">
          <div className="agentes-container">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h5>Agentes asociados al Operativo</h5>
                <hr />
              </div>
            </div>
            <div className="p-3">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Descripción</th>
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
                            className="btn btn-primary btn-sm"
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
