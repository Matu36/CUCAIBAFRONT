import React, { useState} from "react";
import Swal from "sweetalert2";
import { getModulos } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/style.css"


const CrearModulo = () => {
  const dispatch = useDispatch();
  const modulos = useSelector((state) => state.modulos);

  //CREACION DE MODULO //
  const [modulo, setModulo] = useState({
    Tipo: "",
    Categoria: "",
    Descripcion: "",
    Valor: "",
    FechaDesde: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      modulo.Tipo &&
      modulo.Categoria &&
      modulo.Descripcion &&
      modulo.Valor &&
      modulo.FechaDesde
    ) {
      const newModulo = {
        ...modulo,
      };
      //dispatch(createComida(newComida));
      await Swal.fire({
        position: "center",
        icon: "success",
        title: "La Comida ha sido creada",
        showConfirmButton: false,
        timer: 4000,
      });

      setModulo({
        Tipo: "",
        Categoria: "",
        Descripcion: "",
        Valor: "",
        fechaDesde: "",
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
    <div className="form-container">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <div>
            <label for="tipo">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={modulo.Tipo}
              autocomplete="off"
              placeholder="Tipo"
              onChange={(e) => setModulo({ ...modulo, Tipo: e.target.value })}
            />
          </div>
          <div>
            <label for="categoria">Categoria</label>
            {/* <select name="categoria" value={modulo.Categoria} onChange={(e) => setModulo({ ...modulo, Categoria: e.target.value })} placeholder="Selecciona una categoria">
          {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select> */}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label for="descripcion">Descripcion</label>
            <input
              type="text"
              name="descripcion"
              value={modulo.Descripcion}
              autocomplete="off"
              placeholder="Descripción"
              onChange={(e) =>
                setModulo({ ...modulo, Descripcion: e.target.value })
              }
            />
          </div>
          <div>
            <label for="valor">Valor</label>
            <input
              type="number"
              name="valor"
              value={modulo.Valor}
              autocomplete="off"
              placeholder="Valor"
              onChange={(e) => setModulo({ ...modulo, Valor: e.target.value })}
            />
          </div>
          <div>
            <label for="fechaDesde">Fecha Desde</label>
            <input
              type="date"
              name="fechaDesde"
              value={modulo.FechaDesde}
              autocomplete="off"
              placeholder="Fecha Desde"
              onChange={(e) =>
                setModulo({ ...modulo, FechaDesde: e.target.value })
              }
            />
          </div>
        </div>
        <button type="submit">Crear Modulo</button>
      </form>
    </div>
  );
};

export default CrearModulo;
