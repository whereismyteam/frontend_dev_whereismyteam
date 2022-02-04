import styled from 'styled-components';

// 기본 파랑 색상 버튼입니다.
// 버튼 사용시 btnName props에 버튼 이름을 전달해주면 됩니다.

type BtnProps = {
  btnName: string;
  width: number;
  height: number;
  marginTop?: number;
};

const BtnWrapper = styled.div<{ width: number; height: number; marginTop?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  margin-top: ${(props) => props.marginTop}px;
  border-radius: 30px;
  font-size: var(--font-size-base);
  font-weight: bold;
  color: #fff;
  background-color: var(--color-blue);
  cursor: pointer;
`;

const Btn = styled.div``;

function DefaultBlueBtn({ btnName, width, height, marginTop }: BtnProps) {
  return (
    <BtnWrapper width={width} height={height} marginTop={marginTop}>
      <Btn>{btnName}</Btn>
    </BtnWrapper>
  );
}

export default DefaultBlueBtn;
