import { postAgentes } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
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
  legajo: 0,
};

const postAgente = () => {
  let dispatch = useDispatch();
  const [agente, setAgente] = useState(INITIALSTATE);
  const [showForm, setShowForm] = useState(false);

  const [statusForm, setStatusForm] = useState("create");

  const [clicked, setClicked] = useState(false);

  const { data: personaData, refetch } = usePersona(
    agente.nroDocumento,
    clicked
  ).personaQuery;

  const handleFindPersona = () => {
    if (agente.nroDocumento) {
      setClicked(true);
      refetch();

      if (typeof personaData == "object") {
        setShowForm(true);
        setAgente({
          ...agente,
          apellido: personaData.apellido,
          nombre: personaData.nombre,
          cuil: personaData.cuil,
          cbu: personaData.cbuBloque1 + personaData.cbuBloque2,
          tipoPago: personaData.tipoPago == 7 ? "cb" : "ch",
          personaid: personaData.id,
          legajo: personaData.legajo,
        });

        if (personaData[0] == "update") {
          setStatusForm("update");
          setAgente({
            ...agente,
            apellido: personaData[1].apellido,
            nombre: personaData[1].nombre,
            cuil: personaData[1].cuil,
            cbu: personaData[1].cbu,
            tipoPago: personaData[1].tipoPago == 7 ? "cb" : "ch",
            personaid: personaData[1].id,
            legajo: personaData[1].legajo,
          });
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Se actualizaron los datos del agente",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          setStatusForm("create");
        }
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
        setClicked(false);
      }
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (typeof personaData == "object" && agente) {
      const newAgente = {
        apellido: agente.apellido,
        nombre: agente.nombre,
        cuil: agente.cuil,
        cbu: agente.cbu,
        tipoPago: agente.tipoPago,
        personaid: personaData.id,
        dni: agente.nroDocumento,
        legajo: agente.legajo,
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
          <div className="mb-3 d-flex flex-md-row formAgente gap-2 align-items-center">
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
              <label htmlFor="inputLegajo" className="form-label">
                Legajo
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLegajo"
                aria-describedby="LegajoHelp"
                name="legajo"
                value={agente.legajo}
                autoComplete="off"
                placeholder="Legajo"
                disabled
                onChange={(e) =>
                  setAgente({ ...agente, legajo: e.target.value })
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
                disabled
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
                {statusForm != "update" && (
                  <button type="submit" className="btn btn-success btn btn-md">
                    Cargar Agente
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export default postAgente;
