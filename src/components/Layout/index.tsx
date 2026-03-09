import { useState, type ReactNode } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { darkTheme, lightTheme } from "../../styles/theme/theme";
import { ThemeContext } from "../../context/ThemeContext";

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            <StyledProvider theme={isDark ? darkTheme : lightTheme}>
                {children}
            </StyledProvider>
        </ThemeContext.Provider>
    )
};