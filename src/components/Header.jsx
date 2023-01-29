import React, { useState } from 'react';
import Logo from '../assets/Titulo.webp';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import '../styles/Header.css'

const Header = () => {
    const [darkMode, setDarkMode] = useState(true);

    const handleClick = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('darkMode')
    }

    return (
        <section className='header'>
            <button type='button' className='mini-button'></button>
            <img src={Logo} className="header__logo" alt="" />
            <button className='mini-button' type='button' onClick={handleClick}>{darkMode ? <MdDarkMode /> :  <MdOutlineDarkMode />}</button>
        </section>
    )
}

export default Header
