import React, { useContext } from 'react'
import DataContext from './context/DataContext'
import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa'

const Header = ({title}) => {
  const { width } = useContext(DataContext);
  return (
    <header className="Header">
      {title} &nbsp;&nbsp;
      {width < 768 ? <FaMobileAlt/> 
        : width < 992 ? <FaTabletAlt/>
        : <FaLaptop/>}
    </header>
  )
}

export default Header