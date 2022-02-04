import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import InfinitySansR from '../fonts/InfinitySansR-Regular.otf';
import InfinitySansB from '../fonts/InfinitySans-Bold.otf';

const GlobalStyles = createGlobalStyle` 
  ${reset}

  @font-face {
    font-family: "Infinity Sans";
    src: local("InfinitySansR"),
    url(${InfinitySansR}) format('opentype');
    font-style: normal;
    font-weight: normal; 
  }
  @font-face {
    font-family: "Infinity Sans";
    src: local("InfinitySansB"),
    url(${InfinitySansB}) format('opentype');
    font-style: normal;
    font-weight: bold; 
  }

  :root {
    --font-size-large-2: 35px;
    --font-size-large: 30px;
    --font-size-mid: 20px;
    --font-size-base: 17px;
    --font-size-small: 13px;

    --color-blue: #2353BB;
    --color-yellow: #f8d274;
    --color-dark-grey: #9d9d9d;
    --color-pink-red: #fe7777;
  }

  body {
    overflow: hidden;
    font-family: 'Infinity Sans';
  }

  position: relative;
  font-size: var(--font-size-base);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyles;
