import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Select from "react-select";
import "../assets/styles/select2.css";
import NumberFormatter from "../utils/NumberFormatter";

const PostHonorarios = ({
  disabled,
  handleModuloId,
  handleClick,
  ...props
}) => {
  const {
    refetchModulosActivos: refetch,
    dataModulosActivos: data,
    loadingModulosActivos: isLoading,
    fetchedModulosActivos: isFetched,
  } = props;

  const [options, setOptions] = useState([
    { value: "0|0", label: "Elegí una opción" },
  ]);

  useEffect(() => {
    if (!isLoading && isFetched) {
      if (data && data.length > 0) {
        const nuevasOpciones = [
          { value: "0|0", label: "Elegí una opción" },
          ...data.map((m) => ({
            value: `${m.id}|${m.valor}`,
            label: m.descripcion,
          })),
        ];

        setOptions(nuevasOpciones);
      }
    }
  }, [isFetched, isLoading, data]);

  const [value, setValue] = useState(0);

  const handleChange = (selected) => {
    const arrayValue = selected.value.split("|");
    setValue(arrayValue[1]);
    handleModuloId(Number(arrayValue[0]));
  };

  const handleCreateClick = () => {
    if (value === 0) {
      alert("Se tiene que elegir un modulo");
      return;
    }
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.value === "0|0")
    );
    setValue(0);
    handleModuloId(0);
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
        <div className="mb-3" style={{ width: "60%" }}>
          <label htmlFor="funcionSelect" className="form-label fw-bold">
            Seleccionar Función
          </label>
          <Select
            options={options}
            classNames={{ container: () => "select2-container" }}
            placeholder="Seleccioné una opción"
            onChange={handleChange}
            noOptionsMessage={() => "No hay ningún modulo disponible"}
            aria-label="Default select example"
            isDisabled={disabled}
          />
        </div>
        <div className="mb-3 w-20">
          <label htmlFor="valorModuloDisabled" className="form-label fw-bold">
            Valor
          </label>
          <input
            className="form-control"
            type="text"
            id="valorModuloDisabled"
            value={`$ ${NumberFormatter(Number(value))}`}
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
            className="btn btn-guardar"
            disabled={value === 0}
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
