import { useState } from 'react';
import styled from 'styled-components';

const SearchStackBtn = styled.div<{ isStackClick: boolean }>`
  height: 25px;
  background: ${(props) => (props.isStackClick ? 'var(--color-blue)' : 'var(--color-light-blue)')};
  border-radius: 30px;
  color: #fff;
  padding: 8px 20px 0 20px;
  margin: 0 4.5px;
  cursor: pointer;
`;

function StackBtn({ btnName }: { btnName: string }) {
  const [isStackClick, setIsStackClick] = useState(false);
  const onClickStackBtn = () => {
    setIsStackClick((props) => !props);
  };
  return (
    <SearchStackBtn onClick={onClickStackBtn} isStackClick={isStackClick}>
      {btnName}
    </SearchStackBtn>
  );
}

export default StackBtn;
