import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { clearState } from '../../store/auth';

import Modal from '../../components/common/modal';
import { useEffect, useState } from 'react';

interface WriteModalProps {
  setModalClose: () => void;
  visible: boolean;
}

const ContentWrapper = styled.main`
  padding: 40px;
  height: calc(100% - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

const FormWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  overflow-y: scroll;
`;

const MainTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: var(--font-size-mid);
  padding-bottom: 30px;
  border-bottom: 1px solid #d7d7d7;
`;

const OptionSection = styled.section`
  width: calc(100% - 40px);
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 20px;
  border-bottom: 1px solid #d7d7d7;
`;

const OptionTitle = styled.span`
  font-size: var(--font-size-base-2);
`;

const OptionSelect = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;

  div {
    margin-right: 10px;
  }
`;

const SelectDropDown = styled.select`
  width: 100px;
  border: none;
  outline: none;

  margin-right: 10px;
`;

const SelectedButton = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 3px 12px;
  border-radius: 30px;
  color: #fff;
  background-color: ${(props) => (props.selected ? `var(--color-blue)` : `#CDCDCD`)};
`;

const StackDelete = styled.span`
  padding-left: 8px;
  color: var(--color-yellow);
  :hover {
    cursor: pointer;
  }
`;

const InputTitle = styled.input`
  font-size: var(--font-size-large-2);
  border: none;
  outline: none;
`;

const TextareaPost = styled.textarea`
  width: calc(100% - 20px);
  height: 300px;
  font-size: var(--font-size-mid);
  border: none;
  outline: none;
  overflow-y: scroll;
  padding: 10px;
`;

const SubmitButton = styled.div`
  width: calc(calc(100% - 40px) / 3);
  padding: 20px 0px;
  border-radius: 50px;
  text-align: center;
  color: #000;
  background-color: var(--color-yellow);
`;

function Write() {
  const [category, setCategory] = useState('프로젝트');
  const [parts, setParts] = useState<Array<string>>([]);
  const [onOff, setOnOff] = useState('온라인');
  const [location, setLocation] = useState('');
  const [member, setMember] = useState('');
  const [stacks, setStacks] = useState<Array<string>>([]);

  return (
    <ContentWrapper>
      <MainTitle>팀원 구하자</MainTitle>
      <FormWrapper>
        <OptionSection>
          <OptionTitle>분야</OptionTitle>
          <OptionSelect>
            {['프로젝트', '대회', '스터디'].map((text, idx) => (
              <SelectedButton onClick={() => setCategory(text)} selected={text === category} key={idx}>
                {text}
              </SelectedButton>
            ))}
          </OptionSelect>
        </OptionSection>
        <OptionSection>
          <OptionTitle>지역</OptionTitle>
          <SelectDropDown onChange={(e) => setLocation(e.target.value)}>
            {['서울', '수원', '인천', '대구', '부산', '울산', '광주', '전주', '대전', '세종', '천안', '청주', '원주', '제주', '기타'].map((text, idx) => (
              <option value={text} key={idx}>
                {text}
              </option>
            ))}
          </SelectDropDown>
        </OptionSection>
        <OptionSection>
          <OptionTitle>모집 인원</OptionTitle>
          <SelectDropDown onChange={(e) => setMember(e.target.value)}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '기타'].map((text, idx) => (
              <option value={text} key={idx}>
                {text}
              </option>
            ))}
          </SelectDropDown>
        </OptionSection>
        <OptionSection>
          <OptionTitle>모집 파트</OptionTitle>
          <OptionSelect>
            {['백엔드', '프론트엔드', '기획자', '디자이너'].map((text, idx) => (
              <SelectedButton
                onClick={() => setParts((p) => (p.includes(text) ? p.filter((v) => v !== text) : [...p, text]))}
                selected={parts.includes(text)}
                key={idx}
              >
                {text}
              </SelectedButton>
            ))}
          </OptionSelect>
        </OptionSection>
        <OptionSection>
          <OptionTitle>회의 방식</OptionTitle>
          <OptionSelect>
            {['온라인', '오프라인', '온/오프'].map((text, idx) => (
              <SelectedButton onClick={() => setOnOff(text)} selected={text === onOff} key={idx}>
                {text}
              </SelectedButton>
            ))}
          </OptionSelect>
        </OptionSection>
        <OptionSection>
          <OptionTitle>기술 스택</OptionTitle>
          <div style={{ display: 'flex' }}>
            <SelectDropDown value="선택" onChange={(e) => !stacks.includes(e.target.value) && setStacks((s) => [...s, e.target.value])}>
              <option selected disabled hidden>
                선택
              </option>
              {['JavaScript', 'TypeScript', 'Node.js', 'Spring', 'Python', 'React', 'Vue', 'Angular', 'Kotlin'].map((text, idx) => (
                <option value={text} key={idx}>
                  {text}
                </option>
              ))}
            </SelectDropDown>
            <OptionSelect>
              {stacks.map((text, idx) => (
                <SelectedButton selected={true} key={idx}>
                  {text}
                  <StackDelete onClick={() => setStacks((s) => s.filter((v) => v !== text))}>X</StackDelete>
                </SelectedButton>
              ))}
            </OptionSelect>
          </div>
        </OptionSection>
        <OptionSection>
          <InputTitle placeholder="제목" type="text" />
        </OptionSection>
        <TextareaPost placeholder="진행 예상 기간, 진행 방식(온라인/오프라인)과 신청 방법 등 필요한 사항을 자세히 기재해주세요." />
        <OptionSelect>
          {['임시저장', '임시저장한 글', '작성 완료'].map((text, idx) => (
            <SubmitButton key={idx}>{text}</SubmitButton>
          ))}
        </OptionSelect>
      </FormWrapper>
    </ContentWrapper>
  );
}

function WriteModal({ setModalClose, visible }: WriteModalProps) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      setTimeout(() => dispatch(clearState()), 200);
    },
    [visible],
  );

  return <Modal children={<Write />} visible={visible} onClickClose={setModalClose}></Modal>;
}

export default WriteModal;
