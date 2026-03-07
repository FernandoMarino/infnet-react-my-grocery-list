import { Form, InputGroup } from "reactstrap";
import styled from "styled-components";



export const FormContainer = styled.div`
    width: 90%;
    /* border: ${({theme}) => theme.borderWidth} solid ${({theme}) => theme.border}; */
    margin: 3vh auto;
    padding: 1vh 3vw;
`

export const NovaListaInputGroup = styled(InputGroup)`
    margin-bottom: 2vh;
`

export const NovaListaFormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60vw;
    margin: 0 auto;
`