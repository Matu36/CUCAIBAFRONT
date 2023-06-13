import React from 'react'

const PostAgentes = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enviado")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label for="inputApellido" class="form-label">Apellido</label>
        <input type="text" class="form-control" id="inputApellido" aria-describedby="ApellidoHelp" />
      </div>
      <div class="mb-3">
        <label for="inputNombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="inputNombre" aria-describedby="NombreHelp" />
      </div>
      <div class="mb-3">
        <label for="inputCuil" class="form-label">CUIL</label>
        <input type="text" class="form-control" id="inputCuil" aria-describedby="CuilHelp" />
      </div>
      <div class="mb-3">
        <label for="inputCBU" class="form-label">CUIL</label>
        <input type="text" class="form-control" id="inputCBU" aria-describedby="CBUHelp" />
      </div>
      <div class="mb-3">
        <label for="selectPago" class="form-label">Tipo de Pago</label>
        <select class="form-select" aria-label="Default select example">
          <option selected>Interdeposito</option>
          <option>Cheque</option>
        </select>
      </div>
      <button type="submit" className='btn btn-primary' style={{background: "var(--ms-main-color)"}}>Agregar Operativo</button>
    </form>
  )
}

export default PostAgentes
