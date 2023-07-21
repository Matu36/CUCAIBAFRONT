import { postAgentes } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getPersonas } from "../Redux/Actions";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";

const postAgente = () => {
  let dispatch = useDispatch();

  const personas = useSelector((state) => state.personas);
  let primerArreglo = [];
  if (personas.length > 1) {
    primerArreglo = personas[0];
  }

  const [agentes, setAgentes] = useState(primerArreglo);
  const [persona, setPersona] = useState(null);

  useEffect(() => {
    dispatch(getPersonas());
  }, []);

  useEffect(() => {
    setAgentes(primerArreglo);
  }, []);

  const handleFindPersona = () => {
    if (agentes.nroDocumento) {
      const foundPersona = primerArreglo.find(
        (persona) => persona.nroDocumento === agentes.nroDocumento
      );

      if (foundPersona) {
        setPersona(foundPersona);
        setAgentes({
          ...agentes,
          apellido: foundPersona.apellido,
          nombre: foundPersona.nombre,
          cuil: foundPersona.cuil,
          cbu: foundPersona.cbuBloque1 + foundPersona.cbuBloque2,
          tipoPago: agentes.tipoPago,
          personaid: foundPersona.id,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Persona no encontrada",
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "info",
        title:
          "El DNI ingresado no se encontró en la base de datos de empleados",
        showConfirmButton: true,
      });
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (persona) {
      const newAgente = {
        apellido: persona.apellido,
        nombre: persona.nombre,
        cuil: persona.cuil,
        cbu: persona.cbuBloque1 + persona.cbuBloque2,
        tipoPago: agentes.tipoPago,
        personaid: persona.id,
      };

      dispatch(postAgentes(newAgente));

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El Agente ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
      setAgentes({
        apellido: "",
        nombre: "",
        cuil: "",
        cbu: "",
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
      <div className="card">
        <div className="mb-3">
          <label htmlFor="inputFechadePago" className="form-label">
            DNI
          </label>
          <div className="mb-3 d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control"
              id="inputDNI"
              aria-describedby="DNIHelp"
              name="DNI"
              value={agentes.nroDocumento}
              autoComplete="off"
              placeholder="DNI"
              onChange={(e) =>
                setAgentes({ ...agentes, nroDocumento: e.target.value })
              }
            />
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
            value={agentes.apellido}
            autoComplete="off"
            placeholder="Apellido"
            disabled
            onChange={(e) =>
              setAgentes({ ...agentes, apellido: e.target.value })
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
            value={agentes.nombre}
            autoComplete="off"
            placeholder="Nombre"
            disabled
            onChange={(e) => setAgentes({ ...agentes, nombre: e.target.value })}
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
            value={agentes.cuil}
            autoComplete="off"
            placeholder="CUIL"
            disabled
            onChange={(e) => setAgentes({ ...agentes, cuil: e.target.value })}
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
            value={agentes.cbu}
            autoComplete="off"
            placeholder="CBU"
            disabled
            onChange={(e) => setAgentes({ ...agentes, cbu: e.target.value })}
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
            value={agentes.cbu}
            placeholder="tipoPago"
            disabled
            onChange={(e) =>
              setAgentes({ ...agentes, tipoPago: e.target.value })
            }
            className="form-select form-select-md mb-3 form-control"
          >
            <option selected>Selecciona una opción</option>
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
            value={agentes.personaid}
            autoComplete="off"
            placeholder="pERSID"
            disabled
            onChange={(e) =>
              setAgentes({ ...agentes, personaid: e.target.value })
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
      </div>
    </form>
  );
};

export default postAgente;
