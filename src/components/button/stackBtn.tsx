import { useState, Dispatch } from 'react';
import styled from 'styled-components';
import { IPostViewData } from '../../pages/main';

const SearchStackBtn = styled.div<{ isStackClick: boolean }>`
  height: 25px;
  background: ${(props) => (props.isStackClick ? 'var(--color-blue)' : 'var(--color-light-blue)')};
  border-radius: 30px;
  color: #fff;
  padding: 8px 20px 0 20px;
  margin: 0 4.5px;
  cursor: pointer;
`;

function StackBtn({
  btnName,
  stackList,
  setStackList,
  setPatchPostViewData,
}: {
  btnName: string;
  stackList: Set<string>;
  setStackList: React.Dispatch<React.SetStateAction<Set<string>>>;
  setPatchPostViewData: Dispatch<React.SetStateAction<IPostViewData>>;
}) {
  const [isStackClick, setIsStackClick] = useState(false);
  const onClickStackBtn = () => {
    if (isStackClick) {
      stackList.delete(btnName);
      setStackList(stackList);
      setIsStackClick((props) => !props);
    } else {
      stackList.add(btnName);
      setStackList(stackList);
      setIsStackClick((props) => !props);
    }
    setPatchPostViewData((prev) => {
      return {
        ...prev,
        lastArticleIdx: 0,
        tectStacksObj: {
          ...prev.tectStacksObj,
          tech_stacks: Array.from(stackList),
        },
      };
    });
  };
  return (
    <SearchStackBtn onClick={onClickStackBtn} isStackClick={isStackClick}>
      {btnName}
    </SearchStackBtn>
  );
}

export default StackBtn;
