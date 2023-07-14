import React from 'react';
import Liquidaciones from "../components/Liquidaciones";
import BackButton from '../components/UI/BackButton';

const LiquidacionesPendientes = () => {
  return (
    <div className='container p-4'>
      <BackButton />
      <Liquidaciones />
    </div>
  )
}

export default LiquidacionesPendientes
