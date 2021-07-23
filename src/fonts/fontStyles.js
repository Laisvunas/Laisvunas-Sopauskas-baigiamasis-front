import { createGlobalStyle } from "styled-components";
import EczarWoff from "./Eczar/Eczar-Regular.woff";
import EczarWoff2 from "./Eczar/Eczar-Regular.woff2";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: "Eczar";
  font-style: normal;
  font-weight: 400;
  src: url(${EczarWoff}) format('woff2'),
       url(${EczarWoff2}) format('woff');
}

.greek-text {
  font-family: "Eczar", serif;
  font-size: 22px;
  font-weight: normal;
}

`;

export default FontStyles;
