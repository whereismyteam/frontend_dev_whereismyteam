import { css } from 'styled-components';

export default css`
  -ms-overflow-style: block;
  scrollbar-width: block;

  &::-webkit-scrollbar {
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
  }
  overflow-y: scroll;
`;
