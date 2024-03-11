import React, { useContext } from 'react'
import {FaMobileAlt,FaDesktop,FaTabletAlt} from 'react-icons/fa'
import DataContext from './context/DataContext'

const Header = ({title}) => {
  const {width}=useContext(DataContext)
  return (
    <header className='Header'>
    <h1>{title}</h1>
    {width < 768 ? <FaMobileAlt/>
    :width < 992 ? <FaTabletAlt /> 
    : <FaDesktop />}
    </header>
  )
}

export default Header