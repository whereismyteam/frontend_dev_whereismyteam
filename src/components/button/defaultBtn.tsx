import styled, { css } from 'styled-components';

// 기본 파랑 색상 버튼입니다.
// 버튼 사용시 btnName props에 버튼 이름을 전달해주면 됩니다.

type BtnProps = {
  btnName: string;
  width: number;
  height: number;
  color: 'blue' | 'yellow' | 'invBlue';
  onClick?: () => void;
  disabled?: boolean;
};

const blueCSS = `
  color: #fff;
  background-color: var(--color-blue);
`;

const yellowCSS = `
  color: #000;
  background-color: var(--color-yellow);
`;

const invBlueCSS = `
  border: 2px solid var(--color-blue);
  color: var(--color-blue);
  background-color: #fff;
  :hover {
    color: #fff;
    background-color: var(--color-blue);
  }
`;

const handleColorTypes = (color: string) => {
  switch (color) {
    case 'blue':
      return blueCSS;
    case 'yellow':
      return yellowCSS;
    case 'invBlue':
      return invBlueCSS;
    default:
      return blueCSS;
  }
};

export const BtnWrapper = styled.div<{ width: number; height: number; color: string; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 30px;
  font-size: var(--font-size-base);
  cursor: pointer;

  ${(props) => handleColorTypes(props.color)};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => props.disabled && 'none'};
`;

const Btn = styled.div``;

function DefaultBtn({ btnName, width, height, color, onClick, disabled }: BtnProps) {
  return (
    <BtnWrapper onClick={onClick} width={width} height={height} color={color} disabled={disabled || false}>
      <Btn>{btnName}</Btn>
    </BtnWrapper>
  );
}

export default DefaultBtn;
