import { postAgentes } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";
import { validateDNI } from "../utils/Validaciones";
import { usePersona } from "../hooks/usePersona";

const INITIALSTATE = {
  apellido: "",
  nombre: "",
  cuil: "",
  cbu: "",
  tipoPago: "",
  personaid: 0,
  nroDocumento: "",
};

const postAgente = () => {
  let dispatch = useDispatch();
  const [agente, setAgente] = useState(INITIALSTATE);
  const [showForm, setShowForm] = useState(false);

  const { data: personaData, refetch } = usePersona(
    agente.nroDocumento
  ).personaQuery;

  const handleFindPersona = () => {
    if (agente.nroDocumento) {
      refetch();

      if (typeof personaData == "object") {
        setShowForm(true);
        setAgente({
          ...agente,
          apellido: personaData.apellido,
          nombre: personaData.nombre,
          cuil: personaData.cuil,
          cbu: personaData.cbuBloque1 + personaData.cbuBloque2,
          tipoPago: agente.tipoPago,
          personaid: personaData.id,
        });
      } else {
        setShowForm(false);
        setAgente(INITIALSTATE);
        Swal.fire({
          position: "center",
          icon: "info",
          title:
            "El DNI ingresado no se encontró en la base de datos de empleados",
          showConfirmButton: true,
        });
      }
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (personaData) {
      const newAgente = {
        apellido: personaData.apellido,
        nombre: personaData.nombre,
        cuil: personaData.cuil,
        cbu: personaData.cbuBloque1 + personaData.cbuBloque2,
        tipoPago: agente.tipoPago,
        personaid: personaData.id,
      };

      dispatch(postAgentes(newAgente));

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El Agente ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
      setAgente(INITIALSTATE);
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Por favor, completa todos los campos",
        showConfirmButton: true,
      });
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="card">
        <div className="mb-3">
          <label htmlFor="inputFechadePago" className="form-label">
            DNI
          </label>
          <div className="mb-3 d-flex gap-2 align-items-center">
            <input
              type="number"
              className="form-control"
              id="inputDNI"
              aria-describedby="DNIHelp"
              name="DNI"
              value={agente.nroDocumento}
              autoComplete="off"
              placeholder="DNI"
              onChange={(e) => {
                setAgente({ ...agente, nroDocumento: e.target.value });
                validateDNI(e.target.value);
              }}
            />
            <div id="dniErrorMessage" style={{ color: "red", display: "none" }}>
              El DNI debe tener más de 7 carácteres
            </div>
            &#128269;
            <button
              className="btn btn-dark btn btn-md"
              type="button"
              onClick={handleFindPersona}
            >
              Buscar
            </button>
          </div>
        </div>
        {showForm && (
          <>
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
                disabled
                onChange={(e) =>
                  setAgente({ ...agente, apellido: e.target.value })
                }
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
                disabled
                onChange={(e) =>
                  setAgente({ ...agente, nombre: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescripción" className="form-label">
                CUIL
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCUIL"
                aria-describedby="CUILHelp"
                name="CUIL"
                value={agente.cuil}
                autoComplete="off"
                placeholder="CUIL"
                disabled
                onChange={(e) => setAgente({ ...agente, cuil: e.target.value })}
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
                disabled
                onChange={(e) => setAgente({ ...agente, cbu: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputTipoPago" className="form-label">
                Tipo de Pago
              </label>
              <select
                id="inputTipoPago"
                aria-describedby="TipoPagoHelp"
                name="TipoPago"
                value={agente.tipoPago}
                placeholder="tipoPago"
                disabled={!agente.personaid}
                onChange={(e) =>
                  setAgente({ ...agente, tipoPago: e.target.value })
                }
                className="form-select form-select-md mb-3 form-control"
              >
                <option defaultValue="">Selecciona una opción</option>
                <option value="ch">Cheque</option>
                <option value="cb">Cuenta Bancaria</option>
              </select>
            </div>
            <div className="mb-3">
              <input
                type="hidden"
                className="form-control"
                id="inputID"
                aria-describedby="IDHelp"
                name="PersId"
                value={agente.personaid}
                autoComplete="off"
                placeholder="pERSID"
                disabled
                onChange={(e) =>
                  setAgente({ ...agente, personaid: e.target.value })
                }
              />
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <BackButton />
              </div>

              <div>
                <button type="submit" className="btn btn-success btn btn-md">
                  Agregar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default postAgente;
