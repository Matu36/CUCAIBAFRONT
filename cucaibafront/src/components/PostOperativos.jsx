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
      operativo.descripcion &&
      operativo.fechapago
    ) {
      const newOperativo = {
        ...operativo,
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
        fechapago: ""

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
      <div>
        Referencia
        <input
          type="text"
          name="nombre"
          value={operativo.referencia}
          autoComplete="off"
          placeholder="Número de Referencia"
          onChange={(e) =>
            setOperativo({ ...operativo, referencia: e.target.value })
          }
        />
      </div>
      <div>
        Fecha
        <input
          type="date"
          name="fecha"
          value={operativo.fecha}
          autoComplete="off"
          placeholder="Fecha del Operativo"
          onChange={(e) =>
            setOperativo({ ...operativo, fecha: e.target.value })
          }
        />
      </div>
      <div>
        Descripción
        <input
          type="text"
          name="descripción"
          value={operativo.descripcion}
          autoComplete="off"
          placeholder="Descripción"
          onChange={(e) =>
            setOperativo({ ...operativo, descripcion: e.target.value })
          }
        />
      </div>
      <div>
        Fecha de Pago
        <input
          type="date"
          name="Fecha de Pago"
          value={operativo.fechapago}
          autoComplete="off"
          placeholder="Fecha de Pago"
          onChange={(e) =>
            setOperativo({ ...operativo, fechapago: e.target.value })
          }
        />
      </div>
      <button type="submit">Agregar Operativo</button>
    </form>
  )
}

export default PostOperativos
