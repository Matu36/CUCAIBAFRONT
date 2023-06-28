import { postAgentes } from "../Redux/Actions"
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const postAgente = () => {

  let dispatch = useDispatch();

  //---------------------------- CREACION AGENTE ---------------------------- //

  const [agente, setAgente] = useState({
    apellido: "",
    nombre: "",
    cbu: "",
    cuil: "",
    tipoPago:"",
    personaid:""

  });

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
    tipoPago:"",
    personaid:""

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
        <label for="inputApellido" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inputApellido" aria-describedby="ApellidoHelp"
         name="apellido"
          value={agente.apellido}
          autoComplete="off"
          placeholder="Apellido"
          onChange={(e) =>
            setAgente({ ...agente, apellido: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputNombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre" aria-describedby="NombreHelp"
         name="Nombre"
          value={agente.nombre}
          autoComplete="off"
          placeholder="Nombre"
          onChange={(e) =>
            setAgente({ ...agente, nombre: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputDescripción" class="form-label">CBU</label>
        <input type="text" class="form-control" id="inputCBU" aria-describedby="CBUHelp"
         name="CBU"
          value={agente.cbu}
          autoComplete="off"
          placeholder="CBU"
          onChange={(e) =>
            setAgente({ ...agente, cbu: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputFechadePago" class="form-label">CUIL</label>
        <input type="text" class="form-control" id="inputCUIL" aria-describedby="CUILHelp"
         name="CUIL"
          value={agente.cuil}
          autoComplete="off"
          placeholder="CUIL"
          onChange={(e) =>
            setAgente({ ...agente, cuil: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputTipoPago" class="form-label">Tipo de Pago</label>
        <input type="text" class="form-control" id="TipoPago" aria-describedby="TipoPagoHelp"
         name="TIPOPAGO"
          value={agente.tipoPago}
          autoComplete="off"
          placeholder="Tipo de Pago"
          onChange={(e) =>
            setAgente({ ...agente, tipoPago: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputPersId" class="form-label">PersonaId</label>
        <input type="text" class="form-control" id="inputCUIL" aria-describedby="CUILHelp"
         name="PersId"
          value={agente.personaid}
          autoComplete="off"
          placeholder="pERSID"
          onChange={(e) =>
            setAgente({ ...agente, personaid: e.target.value })
          }
        />
      </div>
      <button type="submit" className='btn btn-primary' style={{background: "var(--ms-main-color)"}}>Agregar Agente</button>
    </form>
  )
}

export default postAgente
