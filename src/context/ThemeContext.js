import React, { useState } from 'react';

const ThemeContext = React.createContext(null);

export function ThemeContextProvider({children}){
    const [color, setColor] = useState('red');

    return(
        <ThemeContext.Provider value={{ color, setColor}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext;
