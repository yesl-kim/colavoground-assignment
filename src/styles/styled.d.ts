import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;
    palette: Palette
  }

  export interface Palette {
    [key: string]: string
  }
}