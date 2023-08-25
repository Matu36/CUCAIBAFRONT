import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAgentes, getModulos, postHonorario } from "../Redux/Actions";
import Swal from "sweetalert2";

export const FormHonorario = () => {
  const agentes = useSelector((state) => state.agentes);
  let dispatch = useDispatch();
  const [agente, setAgente] = useState(agentes);

  //---------------------------------SPINNER ------------------------------------//

  const [showSpinner, setShowSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSpinner(false);
    }, 2000);
  }, []);
  if (agentes.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        {showSpinner ? (
          <div
            className="spinner-border spinner-border-lg text-primary"
            style={{ width: "5rem", height: "5rem" }}
            role="status"
          ></div>
        ) : null}
      </div>
    );
  }

  //---------------------------------FIN SPINNER ------------------------------------//

  useEffect(() => {
    dispatch(getAgentes());
  }, []);

  useEffect(() => {
    setAgente(agentes);
  }, []);

  //Renderizando los módulos

  const modulos = useSelector((state) => state.modulos);

  let arregloModulos = [];

  if (modulos.length > 1) {
    arregloModulos = modulos[1][0];
  }
  const [modulo, setModulo] = useState(arregloModulos);

  useEffect(() => {
    dispatch(getModulos());
  }, []);

  useEffect(() => {
    setModulo(arregloModulos);
    console.log(modulo);
  }, []);

  //CREACION DE HONORARIO //
  const [honorario, setHonorario] = useState({
    operativo_id: "",
    agente_id: "",
    modulo_id: "",
    fechaModif: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      honorario.operativo_id &&
      honorario.agente_id &&
      honorario.modulo_id &&
      honorario.fechaModif
    ) {
      dispatch(
        postHonorario(
          honorario.operativo_id,
          honorario.agente_id,
          honorario.modulo_id,
          honorario.fechaModif
        )
      );

      //  ALERT //
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El honorario se ha asignado correctamente al Agente",
        showConfirmButton: false,
        timer: 3000,
      });
      window.location.reload();

      setHonorario({
        operativo_id: "",
        agente_id: "",
        modulo_id: "",
        fechaModif: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });

      // FIN ALTERT //
    }
  };

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [nombreOpcionSeleccionada, setNombreOpcionSeleccionada] = useState("");
  return (
    <div>
      <form onSubmit={handleOnSubmit} className="row g-3 pt-4">
        <div
          className="honorario"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 0,
            color: "#5DADE2",
          }}
        >
          <h6>CREAR HONORARIO</h6>
        </div>
        <hr
          style={{
            margin: "10px 0",
            border: "none",
            borderBottom: "5px solid #5DADE2",
          }}
        />
        <label className="NroPD"> Proceso de Donación Número </label>

        <input
          type="hidden"
          value={honorario.operativo_id}
          name="operativo_id"
        />

        <div className="col-md-6">
          <label htmlFor="tipo">
            Seleccionar Agente
            <span
              style={{
                color: "red",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              *
            </span>
          </label>
          <select
            className="form-select form-select-md mb-3"
            aria-label=".form-select-lg example"
            name="agente_id"
            value={honorario.agente_id}
            onChange={(e) =>
              setHonorario({
                ...honorario,
                agente_id: Number(e.target.value),
              })
            }
            placeholder="Selecciona un tipo"
          >
            <option value="">Seleccionar</option>
            {agentes.map((agente) => (
              <option key={agente.id} value={agente.id}>
                {agente.apellido + ", " + agente.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="tipo">
            Función desempeñada
            <span
              style={{
                color: "red",
                marginLeft: "5px",
                fontSize: "20px",
              }}
            >
              *
            </span>
          </label>
          <select
            className="form-select form-select-md mb-3"
            aria-label=".form-select-lg example"
            name="modulo_id"
            value={opcionSeleccionada}
            onChange={(e) => {
              setHonorario({
                ...honorario,
                modulo_id: Number(e.target.value),
              });
              setOpcionSeleccionada(e.target.value);
              setNombreOpcionSeleccionada(
                e.target.options[e.target.selectedIndex].text
              );
            }}
            placeholder="Selecciona un tipo"
          >
            <option value="">Seleccionar</option>
            {arregloModulos.map((modulo) => (
              <option key={modulo.id} value={modulo.id}>
                {modulo.descripcion}
              </option>
            ))}
          </select>

          {opcionSeleccionada && (
            <div className="pt-4">
              <p>{nombreOpcionSeleccionada}</p>
              <p style={{ fontWeight: "bold" }}>
                Valor: {arregloModulos[opcionSeleccionada - 1]?.valor}
              </p>
            </div>
          )}
        </div>

        <input type="hidden" value={honorario.fechaModif} name="fechaModif" />
        <hr
          style={{
            marginTop: "3rem",
            border: "none",
            borderBottom: "5px solid #5DADE2",
          }}
        />
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-outline-secondary pb-2"
            style={{ marginRight: "10px" }}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-guardar pt-2">
            Crear Honorario
          </button>
        </div>
      </form>
    </div>
  );
};
