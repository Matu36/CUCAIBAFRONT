import React, { useState } from "react";
import { useModulos } from "../hooks/useModulos";
import { AiOutlinePlus } from "react-icons/ai";

const PostHonorarios = ({
  disabled,
  handleModuloId,
  handleClick,
  operativoId,
}) => {
  const { data, isLoading, refetch } =
    useModulos(operativoId).modulosActivosQuery;

  const [value, setValue] = useState(0);
  const [selectValue, setSelectValue] = useState("0|0");
  const handleChange = (e) => {
    let arrayValue = e.target.value.split("|");

    setSelectValue(e.target.value);
    setValue(arrayValue[1]);
    handleModuloId(Number(arrayValue[0]));
  };

  const handleCreateClick = () => {
    if (value == 0) {
      alert("Se tiene que elegir un modulo");
      return;
    }
    setSelectValue("0|0");
    setValue(0);
    handleModuloId(Number(0));
    handleClick();
  };

  return (
    <div className="mt-5">
      <div
        className="d-flex align-items-center justify-content-between w-100 gap-2 rounded border p-5"
        style={{
          backgroundColor: "#edede9",
          boxShadow: "0px 0px 18px -28px rgba(0,0,0,0.2)",
          flexDirection: window.innerWidth < 1000 ? "column" : "row",
        }}
      >
        <div className="mb-3 w-60 ">
          <label htmlFor="funcionSelect" className="form-label fw-bold">
            Seleccionar Función
          </label>
          <select
            onChange={handleChange}
            id="funcionSelect"
            className="form-select"
            aria-label="Default select example"
            disabled={disabled}
            value={selectValue}
          >
            <option defaultChecked value={`${0}|${0}`}>
              Elegí una opción
            </option>
            {isLoading ? (
              <option defaultChecked>Cargando...</option>
            ) : (
              typeof data == "object" &&
              data.map((m) => (
                <option value={`${m.id}|${m.valor}`} key={m.id}>
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
            value={value}
            aria-label="Disabled Valor modulo"
            disabled
          />
        </div>
        <div className="mb-3 d-flex flex-column w-30">
          <label className="form-label fw-bold" htmlFor="buttonAddModulo">
            Agregar
          </label>
          <button
            id="buttonAddModulo"
            type="button"
            className="btn btn-success"
            disabled={value == 0}
            onClick={() => {
              handleCreateClick();
              refetch();
            }}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostHonorarios;
