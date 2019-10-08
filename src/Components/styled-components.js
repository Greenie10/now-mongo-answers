import styled from 'styled-components';
import {colourConstants} from '../constants';

const { COLOUR } = colourConstants;

export const QuestionWrapper = styled.article`
  padding-top: 1rem;
  position: relative;
  :first-of-type:before {
    display: none;
  }
  :before {
    background-image: linear-gradient(to right, transparent, ${COLOUR.DECORATION}, transparent);
    content: "";
    height: 1px;
    left: 5%;
    position: absolute;
    right: 5%;
    width: 90%;
  } 
`;

export const Fleuron = styled.div`
  bottom: -40px;
  color: ${COLOUR.DECORATION};
  height: 20px;
  left: 50%;
  position: absolute;
  width: 20px;
`;

export const ZoneBox = styled.span`
  background-color: ${props => props.zone || "white"};
  border: 1px solid ${COLOUR.TEXT};
  border-radius: 50%;
  display: inline-block;
  font-size: 0.6rem;
  padding: 5px;
`;


export const QuestionH4 = styled.h4`
`;



export const AnswersList = styled.dl`
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 500px) {
    flex-wrap: nowrap;
  }
  margin-top: 0.5em;
  dt, dd {
    margin-inline-start: 0;
    padding: 0.5em;
  }
  dt {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    @media (min-width: 500px) {
      border-top-right-radius: 0;
      border-bottom-left-radius: 5px;
    }

    flex-grow: 0;
    font-family: Nunito, sans-serif;
    font-weight: bold;
  }
  dd {
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 100%;
    @media (min-width: 500px) {
      border-bottom-left-radius: 0;
      width: auto;
    }
    flex-grow: 2;
    margin-inline-end: 0.1em;
  }
  dt:nth-of-type(even), dd:nth-of-type(even) {
    background-color: ${COLOUR.WHITE1};
  }
  dt:nth-of-type(even), dt:nth-of-type(odd)  {
    margin-top: 2px;
    padding-bottom: 0;
    @media (min-width: 500px) {
      margin-top: 0;
      padding-bottom: 0.5em;
    }

  }
  dt:nth-of-type(odd), dd:nth-of-type(odd) {
    background-color: ${COLOUR.WHITE2};
  }
`;




