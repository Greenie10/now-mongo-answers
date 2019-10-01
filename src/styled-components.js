import styled from 'styled-components';

export const NavWrapper = styled.nav`
  background-color: #4FD6B8;
  border-bottom-right-radius: 1em;
  font-family: Nunito, sans-serif;


  ul {
    list-style: none;
    margin: 0;
    padding: 1em;
  }
  li {
    display: inline;
  }
  a {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    color: black;
    padding: 1em;
    position: relative;
    text-decoration: none;
    transform: perspective(1px) translateZ(0);
    transition-duration: 0.3s;
    transition-property: all;
  }
  a:hover {
    background-color: #2bb797;
    color: white;
  }
`;

export const QuestionWrapper = styled.article`
  padding-top: 1rem;
  position: relative;
  :first-of-type:before {
    display: none;
  }
  :before {
    background-image: linear-gradient(to right, transparent, lightsteelblue, transparent);
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
  color: lightsteelblue;
  height: 20px;
  left: 50%;
  position: absolute;
  width: 20px;
`;

export const ZoneBox = styled.span`
  background-color: ${props => props.zone || "white"};
  border: 1px solid grey;
  padding: 0 0.2rem;
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
    background-color: mintcream;
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
    background-color: ghostwhite;
  }
`;
