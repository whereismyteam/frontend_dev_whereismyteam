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
    --font-size-base-2: 15px;
    --font-size-small: 13px;
    --font-size-small-2: 11px;

    --color-blue: #2353BB;
    --color-light-blue: rgba(35, 83, 187, 0.4);
    --color-yellow: #f8d274;
    --color-light-yellow: rgba(255, 209, 98, 0.3);
    --color-dark-grey: #9d9d9d;
    --color-pink-red: #fe7777;
  }

  body * {
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

  /* &::-webkit-scrollbar {
    display: block;
    width: 4px;
    height: 8px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #758ec4;
    opacity: 0.5;

    &:hover {
      background-color: var(--color-blue);
    }
  }
  &::-webkit-scrollbar-track {
    background: #fff;
  } */
  overflow: scroll;
`;

export default GlobalStyles;
