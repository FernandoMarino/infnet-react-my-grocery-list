import styled from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    /* background-color: aqua; */
`

export const HomeNavButtonGroup = styled.nav`
    display: flex;
    justify-content: center;
    /* background-color: yellow; */
    gap: 1vw;
    margin: 3vh 0;

    Button {
        min-width: 10vw;
        background-color: ${({theme})=> theme.secondary};
        color: ${({theme})=> theme.primary};
        font-weight: bold;
        
        &:hover {
            opacity: 0.9;

        }
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