import { Form, Input, InputGroup } from "reactstrap";
import styled from "styled-components";



export const FormContainer = styled.div`
    width: 90%;
    /* border: ${({theme}) => theme.borderWidth} solid ${({theme}) => theme.border}; */
    margin: 3vh auto;
    padding: 1vh 3vw;
`

export const NovaListaInputGroup = styled(InputGroup)`
    margin-bottom: 2vh;
    width: 100%;
    background-color: aliceblue;

    
`

export const NovaListaFormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    margin: 0 auto;
    background-color: aqua;
`

export const NovaListaFormTextInput = styled(Input)`
    width: 100% ;
`



