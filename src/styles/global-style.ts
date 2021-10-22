import { createGlobalStyle } from "styled-components";
import {reset} from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box
  }

  body {
    max-width: 480px;
    margin: 0 auto;
  }

  ol, ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button, input {
    outline: none;
    border: none;
    background-color: transparent;
    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
      box-shadow: none;
    }
  }

  input {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    background: none;
  }
`

export default GlobalStyle;

