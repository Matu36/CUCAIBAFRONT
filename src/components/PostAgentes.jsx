import { postAgentes } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const postAgente = () => {
  let dispatch = useDispatch();

  const [persona, setPersona] = useState(null);

  //---------------------------- CREACION AGENTE ---------------------------- //

  const [agente, setAgente] = useState({
    apellido: "",
    nombre: "",
    cbu: "",
    cuil: "",
    tipoPago: "",
    personaid: "",
  });

  const handleFindPersona = () => {
    console.log(agente.cuil);
    setPersona([]);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      agente.apellido &&
      agente.nombre &&
      agente.cbu &&
      agente.cuil &&
      agente.tipoPago &&
      agente.personaid
    ) {
      const newAgente = {
        ...agente,
      };
      dispatch(postAgentes(newAgente));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El Agente ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
      // window.location.reload();
      setAgente({
        apellido: "",
        nombre: "",
        cbu: "",
        cuil: "",
        tipoPago: "",
        personaid: "",
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label htmlFor="inputFechadePago" className="form-label">
          CUIL
        </label>
        <div
          className="d-flex gap-5 align-items-center justify-content-center"
          style={{ height: "40px" }}
        >
          <input
            type="text"
            className="form-control"
            id="inputCUIL"
            aria-describedby="CUILHelp"
            name="CUIL"
            value={agente.cuil}
            autoComplete="off"
            placeholder="CUIL"
            onChange={(e) => setAgente({ ...agente, cuil: e.target.value })}
          />
          <button
            className="btn "
            type="button"
            style={{
              background: "var(--ms-main-color)",
              color: "#fff",
            }}
            onClick={handleFindPersona}
          >
            Buscar Persona
          </button>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="inputApellido" className="form-label">
          Apellido
        </label>
        <input
          type="text"
          className="form-control"
          id="inputApellido"
          aria-describedby="ApellidoHelp"
          name="apellido"
          value={agente.apellido}
          autoComplete="off"
          placeholder="Apellido"
          disabled={persona === null}
          onChange={(e) => setAgente({ ...agente, apellido: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputNombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="inputNombre"
          aria-describedby="NombreHelp"
          name="Nombre"
          value={agente.nombre}
          autoComplete="off"
          placeholder="Nombre"
          disabled={persona === null}
          onChange={(e) => setAgente({ ...agente, nombre: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputDescripción" className="form-label">
          CBU
        </label>
        <input
          type="text"
          className="form-control"
          id="inputCBU"
          aria-describedby="CBUHelp"
          name="CBU"
          value={agente.cbu}
          autoComplete="off"
          placeholder="CBU"
          disabled={persona === null}
          onChange={(e) => setAgente({ ...agente, cbu: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputTipoPago" className="form-label">
          Tipo de Pago
        </label>
        <input
          type="text"
          className="form-control"
          id="TipoPago"
          aria-describedby="TipoPagoHelp"
          name="TIPOPAGO"
          value={agente.tipoPago}
          autoComplete="off"
          placeholder="Tipo de Pago"
          disabled={persona === null}
          onChange={(e) => setAgente({ ...agente, tipoPago: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inputPersId" className="form-label">
          PersonaId
        </label>
        <input
          type="text"
          className="form-control"
          id="inputCUIL"
          aria-describedby="CUILHelp"
          name="PersId"
          value={agente.personaid}
          autoComplete="off"
          placeholder="pERSID"
          disabled={persona === null}
          onChange={(e) => setAgente({ ...agente, personaid: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ background: "var(--ms-main-color)" }}
      >
        Agregar Agente
      </button>
    </form>
  );
};

export default postAgente;
