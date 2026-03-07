import { Card } from "reactstrap";
import styled from "styled-components";

const borderWidth = "2px"

export const ClickCountContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    /* background-color: aqua; */
    `

export const ClickCountCard = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: fit-content;
    height: 24vh;
    margin: 0 auto;
    background-color: transparent;
    border: ${borderWidth} solid ${({theme}) => theme.border};
    padding: 50px 50px;
    border-radius: 15px;

`

export const CounterP = styled.p`
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    margin: auto;
    color: ${({theme}) => theme.text};

`