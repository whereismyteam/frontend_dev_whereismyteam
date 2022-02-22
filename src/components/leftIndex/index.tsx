import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndexButton = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  height: 130px;
  background-color: var(--color-yellow);
  border-radius: 0px 20px 20px 0px;
  transform: translateX(-33px);
  cursor: pointer;
`;

const IndexButtonSpan = styled.span`
  margin-left: 49px;
  writing-mode: vertical-lr;
  color: #000;
  font-size: var(--font-size-mid);
`;

function LeftIndex() {
  return (
    <Wrapper>
      <IndexButton>
        <IndexButtonSpan>프로젝트</IndexButtonSpan>
      </IndexButton>
      <IndexButton>
        <IndexButtonSpan>대회</IndexButtonSpan>
      </IndexButton>
      <IndexButton>
        <IndexButtonSpan>스터디</IndexButtonSpan>
      </IndexButton>
      <IndexButton>
        <IndexButtonSpan>즐겨찾기</IndexButtonSpan>
      </IndexButton>
    </Wrapper>
  );
}

export default LeftIndex;
