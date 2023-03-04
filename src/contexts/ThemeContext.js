import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [isLight,setisLight] = useState(true);
    const toggleTheme = () => {
        setisLight(!isLight)
    }
    const light = {
        bg: "rgb(231, 231, 250)",
        bg2: "#fff",
        bg3: "#ffe",
        bg4: "blue",
        text: "#000"
    };
    const dark = {
        bg: "#121212",
        bg2: "#36454F",
        bg4: "#7393B3",
        text: "#fff"
    };
    return ( 
        <ThemeContext.Provider value = {{ isLight, dark, light, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
     );
}
 
export default ThemeContextProvider;