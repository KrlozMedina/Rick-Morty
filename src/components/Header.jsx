import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import '../styles/Header.css'

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const color = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('darkMode')
    }

    return (
        <div className='header-container'>
            <h1 style={{ color }}>Rick & Morty</h1>
            <button type='button' onClick={handleClick}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
    )
}

export default Header
