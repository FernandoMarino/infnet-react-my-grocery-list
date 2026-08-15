import styled from "styled-components";



export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family:'Roboto';
    font-weight: 600;
    /* background-color: aqua; */
`

export const HomeNavButtonGroup = styled.nav`
    display: flex;
    /* justify-content: center; */
    align-items: flex-start;
    /* background-color: yellow; */
    height: 100%;
    margin-left: 10%;
    gap: 3vw;
    

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 10vw;
        height: 10vh;
        
        background-color: ${({theme})=> theme.secondary};
        color: ${({theme})=> theme.primary};
        font-weight: bold;
        font-size: 1.5rem;
        
        &:hover {
            opacity: 0.7;

        }
    }
`

export const HomeTitle = styled.h1`
    font-weight: bold;
    margin: 6vh 0 0 3vw;
`

export const HomeSection = styled.section`
    margin: 3vh 3vw;
    font-size: 1.5rem;
    font-weight: 600;

    h3 {
        font-size: 2rem;
        font-weight: bold;
    }

    li {
        font-weight: 400;
    }
`




export const StyledSearchBar = styled.input`
    width: 50%;
    margin: 0 auto;
    background-color: ${({theme})=> theme.searchBarBg};
    color: "#fff";
    border: 1px solid ${({theme})=> theme.border};
    border-radius: 4px;
    line-height: 2;
    padding: 0 8px;
`