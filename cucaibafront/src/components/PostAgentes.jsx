import { postAgentes } from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../assets/styles/detalle.css";
import BackButton from "../components/UI/BackButton";
import { validateDNI } from "../utils/Validaciones";
import { usePersona } from "../hooks/usePersona";
import { FaSearch } from "react-icons/fa";

//Componente que busca la persona en el SQLServer y autocompleta los campos del formulario para la creación del agente

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

  const {
    data: personaData,
    refetch,
    isFetched,
    isFetching,
  } = usePersona(agente.nroDocumento, clicked).personaQuery;

  const handleFindPersona = () => {
    if (agente.nroDocumento.trim() === "") {
      const dniErrorEmpty = document.getElementById("dniErrorEmpty");
      dniErrorEmpty.style.display = "block";
      return;
    }

    if (agente.nroDocumento.length < 7) {
      const dniErrorMessage = document.getElementById("dniErrorMessage");
      dniErrorMessage.style.display = "block";
      return;
    }

    setClicked(true);
    refetch();
  };

  useEffect(() => {
    if (isFetched) {
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

        if (typeof personaData[0] == "string") {
          switch (personaData[0]) {
            case "update":
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
              break;

            case "found":
              setStatusForm("found");
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
                icon: "warning",
                title: "Ya Existe la persona indicada",
                showConfirmButton: false,
                timer: 2000,
              });
              break;
          }
        } else {
          setStatusForm("create");
        }
        setClicked(false);
      } else {
        setShowForm(false);
        setAgente(INITIALSTATE);
        Swal.fire({
          position: "center",
          icon: "info",
          title:
            "El DNI ingresado no se encontró en la base de datos de empleados",
          showConfirmButton: true,
          confirmButtonText: "Cerrar",
          confirmButtonColor: "#4CAF50",
        });
        setClicked(false);
      }
    }
  }, [isFetched, clicked]);

  let isFormValid = true;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormValid && typeof personaData == "object" && agente) {
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
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#4CAF50",
        timer: 2000,
      });
      setAgente(INITIALSTATE);
      setClicked(false);
    } else if (!agente.nroDocumento) {
      
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Por favor, ingresa un DNI válido",
        showConfirmButton: true,
        confirmButtonText: "Cerrar",
        confirmButtonColor: "#4CAF50",
      });
    }
  };
  

  return (
    <>
      <div className="card">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <div className="d-flex gap-3 mb-2">
              <label htmlFor="inputFechadePago" className="form-label">
                DNI
              </label>
              {isFetching && (
                <div
                  className="spinner-border text-primary"
                  role="status"
                ></div>
              )}
            </div>

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
      onInput={(e) => {
        const newValue = e.target.value;
        setAgente({ ...agente, nroDocumento: newValue });
        validateDNI(newValue);

        const dniErrorMessage = document.getElementById("dniErrorMessage");
        const dniErrorEmpty = document.getElementById("dniErrorEmpty");
        if (newValue.trim() === "") {
          dniErrorMessage.style.display = "none";
          dniErrorEmpty.style.display = "none";
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleFindPersona();
        }
      }}
    />
    <button
      className="btn btn-dark btn btn-md"
      type="button"
      onClick={handleFindPersona}
      style={{ display: "inline-flex", alignItems: "center" }}
      disabled={isFetching}
    >
      <FaSearch style={{ marginRight: "5px" }} /> Buscar
    </button>
  </div>

  <div
    id="dniErrorMessage"
    style={{ color: "red", display: "none" }}
  >
    El DNI debe tener más de 7 caracteres
  </div>
  <div
    id="dniErrorEmpty"
    style={{ color: "red", display: "none" }}
  >
    El campo DNI no puede estar vacío
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
                  onChange={(e) =>
                    setAgente({ ...agente, cuil: e.target.value })
                  }
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
                  onChange={(e) =>
                    setAgente({ ...agente, cbu: e.target.value })
                  }
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
                  {statusForm == "create" && (
                    <button
                      type="submit"
                      className="btn btn-success btn btn-md"
                    >
                      Cargar Agente
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </form>
        <br />
        <br />

        <div>
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default postAgente;
