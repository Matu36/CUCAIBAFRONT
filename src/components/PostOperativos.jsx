import { postOperativo } from "../Redux/Actions"
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const PostOperativos = () => {

  let dispatch = useDispatch();

  //---------------------------- CREACION OPERATIVO ---------------------------- //

  const [operativo, setOperativo] = useState({
    referencia: "",
    fecha: "",
    descripcion: "",
    fechapago: "",

  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      operativo.referencia &&
      operativo.fecha &&
      operativo.descripcion 
      // operativo.fechapago
    ) {
      const newOperativo = {
        ...operativo,
        fecha: operativo.fecha.replace("T", " ")
      };
      
      dispatch(postOperativo(newOperativo));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "El operativo ha sido creado",
        showConfirmButton: false,
        timer: 2000,
      });
      // window.location.reload();
      setOperativo({
        referencia: "",
        fecha: "",
        descripcion: "",
        // fechapago: ""

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
        <label for="inputReferncia" class="form-label">Referencia</label>
        <input type="text" class="form-control" id="inputReferencia" aria-describedby="ReferenciaHelp"
         name="referencia"
          value={operativo.referencia}
          autoComplete="off"
          placeholder="Número de Referencia"
          onChange={(e) =>
            setOperativo({ ...operativo, referencia: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputFecha" class="form-label">Fecha</label>
        <input type="datetime-local" class="form-control" id="inputFecha" aria-describedby="FechaHelp"
         name="Fecha"
          value={operativo.fecha}
          autoComplete="off"
          placeholder="Fecha del operativo"
          onChange={(e) =>
            setOperativo({ ...operativo, fecha: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputDescripción" class="form-label">Descripción</label>
        <input type="text" class="form-control" id="inputDescripción" aria-describedby="DescripciónHelp"
         name="descripción"
          value={operativo.descripcion}
          autoComplete="off"
          placeholder="Descripción"
          onChange={(e) =>
            setOperativo({ ...operativo, descripcion: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label for="inputFechadePago" class="form-label">Fecha de Pago</label>
        <input type="date" class="form-control" id="inputFechadePago" aria-describedby="FechadePagoHelp"
         name="Fecha de Pago"
          value={operativo.fechapago}
          autoComplete="off"
          placeholder="Fecha de Pago"
          onChange={(e) =>
            setOperativo({ ...operativo, fechapago: e.target.value })
          }
        />
      </div>
      <button type="submit" className='btn btn-primary' style={{background: "var(--ms-main-color)"}}>Agregar Operativo</button>
    </form>
  )
}


export default PostOperativos
