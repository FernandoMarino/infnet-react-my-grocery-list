import styled from "styled-components";

export const ListasContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family:'Roboto';
    font-weight: 600;
    /* background-color: aqua; */
`
export const ListasButtonGroup = styled.nav`
    display: flex;
    justify-content: center;
    gap: 1vw;

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 10vw;
        margin-top: 2vh;
        
        background-color: ${({theme})=> theme.secondary};
        color: ${({theme})=> theme.primary};
        font-weight: bold;
        font-size: 1.5rem;
        
        &:hover {
            opacity: 0.7;

        }
    }

`