import { useState } from "react";
import { useHonorarios } from "../../../hooks/useHonorarios";
import Modal from "../Modal";
import { FormHonorario } from "../../FormHonorario";
import { AiOutlinePlus } from "react-icons/ai";

const RowExpandedComponent = ({ data: operativo }) => {
  const { data, isLoading } = useHonorarios(operativo.id).honorariosQuery;
  const [modalData, setModalData] = useState({
    operativoID: operativo.id,
    agenteID: "",
  });

  const handleClick = (id) => {
    setModalData({ ...modalData, agenteID: id });
  };

  return (
    <>
      <Modal title="Hola Mundo" data={modalData} referenceID="formModal">
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
                    <th scope="col">Apellido</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">CUIL</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                {isLoading && (
                  <tbody>
                    <tr>
                      <td colSpan={4}>Cargando...</td>
                    </tr>
                  </tbody>
                )}
                {!isLoading && typeof data === "object" ? (
                  <tbody>
                    {data.map((agente) => (
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
                            onClick={() => handleClick(agente.id)}
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
