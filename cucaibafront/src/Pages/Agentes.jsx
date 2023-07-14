import React from 'react'
import GetAgentes from '../components/GetAgentes'
import BackButton from '../components/UI/BackButton'

const Agentes = () => {
  return (
    <div className='container p-4'>
      <BackButton />
        <GetAgentes />
    </div>
  )
}

export default Agentes