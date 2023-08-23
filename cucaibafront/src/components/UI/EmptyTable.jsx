import React from 'react'

// Usado en el Datatable para mostrar el mensaje vacio

const EmptyTable = ({msg}) => {
  return (
    <div className='p-3 fw-bold'>{msg}</div>
  )
}

export default EmptyTable