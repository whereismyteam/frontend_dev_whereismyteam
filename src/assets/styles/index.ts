import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle` 
  ${normalize}

  :root {
    --font-size-mid: 20px;
    --font-size-base: 17px;
    --font-size-small: 13px;

    --color-blue: #2353BB;
    --color-yellow: #f8d274;
  }

  body {
    overflow: hidden;
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
