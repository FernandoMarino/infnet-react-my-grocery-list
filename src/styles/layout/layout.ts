export const borderWidth = "2px"

import styled from "styled-components";

export const BaseContainer = styled.div`
    width: 100vw;
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    display: flex;
    flex-direction: column;
`

export const HeaderContainer = styled.header`
    height: 10vh;
    width: 90vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: ${borderWidth} solid ${({theme}) => theme.border};
    
    `

export const HeaderButton = styled.button`
    
    
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    border: 1px solid ${({theme}) => theme.border};
    padding: 3px 10px;
    border-radius: 4px;
    height: max-content;
    
    
    `

    export const ToggleThemeButton = styled.button`   
    
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    border: ${borderWidth} solid ${({theme}) => theme.border};
    padding: 4px 10px;
    border-radius: 4px;
    /* line-height: 1.5; */
    height: 3rem;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    
    
    &:hover {
        background-color: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.primary};
        border: ${borderWidth} solid ${({theme}) => theme.secondary};
    }
`

export const LinkButton = styled.button`   
    
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    border: ${borderWidth} solid ${({theme}) => theme.border};
    padding: 4px 10px;
    border-radius: 4px;
    line-height: 1.5;
    height: 3rem;
    cursor: pointer;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    
    
    &:hover {
        background-color: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.primary};
        border: ${borderWidth} solid ${({theme}) => theme.secondary};
    }
`

export const MainContainer = styled.main`
    width: 90vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 82vh;
    border-bottom: ${borderWidth} solid ${({theme}) => theme.border};
    /* background-color: ${({theme}) => theme.background}; */
    /* color: ${({theme}) => theme.text}; */
`

export const FooterContainer = styled.footer`
    height: 8vh;
    /* background-color: ${({theme}) => theme.background}; */
    /* color: ${({theme}) => theme.text}; */
    display: flex;
    
    align-items: center;
    justify-content: center;

    
`
export const FooterP = styled.p`
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin: auto;

`

export const LinkButtonGroup = styled.nav`
    display: flex;
    justify-content: center;
    gap: 10px;
`