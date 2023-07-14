import React from 'react'
import GetOperativos from "../components/GetOperativos"
import BackButton from '../components/UI/BackButton';

export const Operativos = () => {
  return (
    <div className='container p-4'>
      <BackButton />
        <GetOperativos />
    </div>
  )
}

export default Operativos