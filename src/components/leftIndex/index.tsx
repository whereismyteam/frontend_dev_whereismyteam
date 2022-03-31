import styled from 'styled-components';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCategoryIndex } from '../../store/main';
import { IPostViewData } from '../../pages/main';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndexButton = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  width: 84px;
  height: 130px;
  border-radius: 0px 20px 20px 0px;
  background-color: ${(props) => (props.isClicked ? 'var(--color-blue)' : 'var(--color-yellow)')};
  transform: ${(props) => (props.isClicked ? 'translateX(0)' : 'translateX(-33px)')};
  cursor: pointer;
`;

const IndexButtonSpan = styled.span<{ isClicked: boolean }>`
  margin-left: 49px;
  writing-mode: vertical-lr;
  color: ${(props) => (props.isClicked ? '#fff' : '#000')};
  font-size: var(--font-size-mid);
`;

// 자기 이름의 버튼이면 -> blue css 적용, 아니면 -> yellow css 적용
type ButtonProps = {
  btnName: string;
  setBtnName: Dispatch<SetStateAction<string>>;
  btnNameProps: string;
};

function Button({ btnName, setBtnName, btnNameProps }: ButtonProps) {
  const onClickBtn = () => {
    setBtnName(btnNameProps);
  };
  let isClicked: boolean;
  if (btnNameProps === btnName) {
    isClicked = true;
  } else {
    isClicked = false;
  }
  return (
    <IndexButton onClick={onClickBtn} isClicked={isClicked}>
      <IndexButtonSpan isClicked={isClicked}>{btnNameProps}</IndexButtonSpan>
    </IndexButton>
  );
}

function LeftIndex({ setPatchPostViewData }: { setPatchPostViewData: Dispatch<React.SetStateAction<IPostViewData>> }) {
  const [btnName, setBtnName] = useState('프로젝트');
  // function returnCategoryIdx(btnName: string) {
  //   if (btnName === '프로젝트') return 1;
  //   else if (btnName === '대회') return 2;
  //   else if (btnName === '스터디') return 3;
  //   else return 0;
  // }
  // dispatch(setCategoryIndex(returnCategoryIdx(btnName)));
  useEffect(() => {
    function returnCategoryIdx(btnName: string) {
      if (btnName === '프로젝트') return 1;
      else if (btnName === '대회') return 2;
      else if (btnName === '스터디') return 3;
      else return 0;
    }
    setPatchPostViewData((prev) => {
      return { ...prev, categoryIdx: returnCategoryIdx(btnName) };
    });
  }, [btnName]);
  return (
    <Wrapper>
      <Button btnName={btnName} setBtnName={setBtnName} btnNameProps={'프로젝트'} />
      <Button btnName={btnName} setBtnName={setBtnName} btnNameProps={'대회'} />
      <Button btnName={btnName} setBtnName={setBtnName} btnNameProps={'스터디'} />
      {/* <Button btnName={btnName} setBtnName={setBtnName} btnNameProps={'즐겨찾기'} /> */}
    </Wrapper>
  );
}

export default LeftIndex;
