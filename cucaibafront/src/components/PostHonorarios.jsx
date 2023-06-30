import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useModulos } from "../hooks/useModulos";

const PostHonorarios = ({ disabled }) => {
  const { modulosQuery } = useModulos();
  console.log(modulosQuery.data);
  const handleChange = (e) => {
    console.log(e);
  };

  return (
    <div className="mt-5">
      <div
        className="d-flex align-items-center justify-content-between w-100 gap-2 rounded border p-5"
        style={{
          backgroundColor: "#edede9",
          boxShadow: "0px 0px 18px -28px rgba(0,0,0,0.2)",
        }}
      >
        <div className="mb-3 w-50 ">
          <label htmlFor="funcionSelect" className="form-label fw-bold">
            Seleccionar Función
          </label>
          <select
            onChange={handleChange}
            id="funcionSelect"
            className="form-select"
            aria-label="Default select example"
            disabled={disabled}
          >
            {modulosQuery.isLoading ? (
              <option defaultChecked>Cargando...</option>
            ) : (
              modulosQuery.data.map((m) => (
                <option value={m.id} key={m.id}>
                  {m.descripcion}
                </option>
              ))
            )}
          </select>
        </div>
        <div className="mb-3 w-20">
          <label htmlFor="valorModuloDisabled" className="form-label fw-bold">
            Valor
          </label>
          <input
            className="form-control"
            type="text"
            id="valorModuloDisabled"
            value="500"
            aria-label="Disabled Valor modulo"
            disabled
          />
        </div>
        <div className="mb-3 d-flex flex-column w-30">
          <label className="form-label fw-bold" htmlFor="buttonAddModulo">
            Agregar Modulo
          </label>
          <button
            id="buttonAddModulo"
            type="button"
            className="btn btn-success"
            disabled={disabled}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHonorarios;
