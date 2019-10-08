import styled, {createGlobalStyle} from 'styled-components';
import {colourConstants} from './constants';

const { COLOUR } = colourConstants;

export const GlobalStyleSheet = createGlobalStyle`
  body {
    background-color: ${COLOUR.BACKGROUND};
    color: ${COLOUR.TEXT};
    font-family: "Lora", serif;
    margin: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  th {
    font-family: Nunito, sans-serif;
    font-weight: normal;
    margin-bottom: 0;
  }
  main {
    padding: 1rem;
  }
`;

export const NavWrapper = styled.nav`
  background-color: ${COLOUR.TEXT};
  font-family: Nunito, sans-serif;
  font-size: 1.5rem;

  ul {
    list-style: none;
    margin: 0;
    padding: 1rem;
  }
  li {
    display: inline;
  }
  a {
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    color: ${COLOUR.BACKGROUND};
    padding: 1rem;
    position: relative;
    text-decoration: none;
    transform: perspective(1px) translateZ(0);
    transition-duration: 0.3s;
    transition-property: all;
  }
  .active {
    background: linear-gradient(${COLOUR.BACKGROUND} 80%, ${COLOUR.TEXT} 100%);
    color: ${COLOUR.TEXT}
  }
  a:hover, .active:hover {
    color: ${COLOUR.LINK_HIGHLIGHT};
  }
`;