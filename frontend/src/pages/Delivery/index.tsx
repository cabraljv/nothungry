import React, { useEffect, useState } from 'react'

// import { Container } from './styles';

const Delivery: React.FC = () => {
  const [whatsapp, setWhatsapp] = useState('')

  useEffect(() => {
    const localValue = localStorage.getItem('@whatsapp')
    if (localValue) {
      setWhatsapp(localValue)
    }
  }, [])
  return <div >
    <h1>{whatsapp}</h1>
  </div>
}

export default Delivery
