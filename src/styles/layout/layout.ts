
import styled from "styled-components";

export const HeaderContainer = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};

`

export const HeaderButton = styled.button`
    
    
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    border: 1px solid ${({theme}) => theme.border};
    padding: 3px 10px;
    border-radius: 4px;
    height: max-content;


`

export const ThemedButton = styled.button`   
    
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    border: 1px solid ${({theme}) => theme.border};
    padding: 3px 10px;
    border-radius: 4px;
    height: max-content;
    cursor: pointer;

    &:hover {
        background-color: ${({theme}) => theme.secondary};
        color: ${({theme}) => theme.primary};
        border: 1px solid ${({theme}) => theme.secondary};
    }
`

export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80vh;
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
`

export const FooterContainer = styled.footer`
    height: 10vh;
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    
`
export const ThemedP = styled.p`
    text-align: center;

`

export const ThemedButtonGroup = styled.nav`
    display: flex;
    justify-content: center;
    gap: 10px;
`