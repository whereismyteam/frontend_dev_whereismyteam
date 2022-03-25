import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { clearState } from '../../store/auth';

import Modal from '../../components/common/modal';
import { useEffect, useRef, useState } from 'react';
import { patchPost, patchPostFix, postPost } from '../../apis/post';
import { rootState } from '../../store';
import { IPost } from '.';

interface WriteModalProps {
  isEdit: boolean;
  postInfo?: IPost | null;
  setModalClose: () => void;
  setPostInfo?: React.Dispatch<React.SetStateAction<IPost | null>>;
  visible: boolean;
}

interface WriteProps {
  isEdit: boolean;
  postInfo?: IPost | null;
  setModalClose: () => void;
  setPostInfo?: React.Dispatch<React.SetStateAction<IPost | null>>;
}

const ContentWrapper = styled.main`
  padding: 40px;
  height: calc(100% - 80px);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  cursor: default;
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
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  div {
    margin-right: 10px;
  }
`;

const SelectDropDown = styled.select`
  width: 100px;
  height: 22px;
  border: none;
  outline: none;

  margin-right: 10px;
`;

const SelectedButton = styled.div<{ selected: boolean }>`
  position: relative;
  padding: 0px 12px;
  min-width: max-content;
  line-height: 25px;
  border-radius: 30px;
  color: #fff;
  background-color: ${(props) => (props.selected ? `var(--color-blue)` : `#CDCDCD`)};
`;

const SelectedDelete = styled.span`
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

const SubmitButton = styled.div<{ siblings: number }>`
  width: ${(props) => `calc(calc(100% - 40px) / ${props.siblings} )`};
  padding: 20px 0px;
  border-radius: 50px;
  text-align: center;
  color: #000;
  background-color: var(--color-yellow);
  :hover {
    cursor: pointer;
  }
`;

const AddButton = styled.div`
  position: relative;
  color: var(--color-blue);
  font-size: var(--font-size-large);
  min-width: 75px;
  line-height: 25px;
  padding: 0px 10px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 30px;

  :hover {
    cursor: pointer;
  }
`;

const AddInputButton = styled.input<{ maxWidth: number }>`
  position: relative;
  max-width: ${(props) => props.maxWidth}px;
  padding: 0px 10px;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 30px;
  outline: none;

  margin-right: 10px;
`;

const HiddenSpan = styled.span`
  visibility: hidden;
  position: absolute;
  top: -10000;
  font-size: 16px;
`;

function Write({ isEdit, postInfo, setPostInfo, setModalClose }: WriteProps) {
  const userIdx = useSelector((state: rootState) => state.user.userIdx);

  const [categoryName, setCategoryName] = useState('프로젝트');
  const [recruitmentPart, setRecruitmentPart] = useState<Array<string>>([]);
  const [recruitmentPartList, setRecruitmentPartList] = useState<Array<string>>(['백엔드', '프론트엔드', '기획자', '디자이너']);
  const [onOff, setOnOff] = useState('온라인');
  const [area, setArea] = useState('서울');
  const [capacityNum, setCapacityNum] = useState<number>(1);
  const [techstacks, setTechStacks] = useState<Array<string>>([]);

  const [isNewPartAdding, setIsNewPartAdding] = useState(false);
  const [newPartWidth, setNewPartWidth] = useState(55);

  const postTitleRef = useRef<HTMLInputElement>(null);
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);
  const hiddenSpanRef = useRef<HTMLSpanElement>(null);

  const checkRecruitmentPartSelected = () => recruitmentPart.length !== 0;

  const checkTechStacksSelected = () => techstacks.length !== 0;

  const checkTitleFilled = () => postTitleRef.current?.value !== '';

  const checkTextFilled = () => postTextRef.current?.value !== '';

  const onKeyUpAddPartInput = () => {
    hiddenSpanRef.current!.textContent = addInputRef.current!.value;
    setNewPartWidth(hiddenSpanRef.current!.offsetWidth < 35 ? 55 : hiddenSpanRef.current!.offsetWidth + 15);
  };

  const onKeyDownEnter = (e: globalThis.KeyboardEvent) => {
    if (document.activeElement !== addInputRef.current) return;
    if (e.key !== 'Enter') return;
    if (newPartWidth === 0) return;

    setRecruitmentPartList((now) => [...now, addInputRef.current!.value]);
    setRecruitmentPart((now) => [...now, addInputRef.current!.value]);
    setIsNewPartAdding(false);
    addInputRef.current!.value = '';
    hiddenSpanRef.current!.textContent = '';
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownEnter);
    return () => {
      window.removeEventListener('keydown', onKeyDownEnter);
    };
  }, []);

  useEffect(() => {
    if (!isEdit || !postInfo) return;

    const {
      category,
      stackList,
      title,
      detail: { location, number, onOff, parts },
      postText,
    } = postInfo;

    setCategoryName(category);
    setRecruitmentPart(parts);
    setRecruitmentPartList((now) => [...now, ...parts.filter((s) => !now.includes(s))]);
    setOnOff(onOff);
    setArea(location);
    setCapacityNum(number);
    setTechStacks(stackList);

    postTitleRef.current!.value = title;
    postTextRef.current!.value = postText;
  }, []);

  const checkInputs = () => {
    if (!checkRecruitmentPartSelected()) return alert('모집 파트를 선택해주세요');
    if (!checkTechStacksSelected()) return alert('기술 스택을 선택해주세요');
    if (!checkTitleFilled()) return alert('제목을 입력해주세요');
    if (!checkTextFilled()) return alert('글 내용을 입력해주세요');
  };

  const onClickEdit = async () => {
    checkInputs();

    const res = await patchPostFix({
      postIdx: postInfo!.boardIdx,
      userIdx,
      title: postTitleRef.current!.value,
      content: postTextRef.current!.value,
      onOff,
      category: categoryName,
      capacityNum,
      recruitmentPart,
      area,
      techstacks,
    });

    if (res.ok && setPostInfo) {
      const fetchPostData = async () => {
        const updatedRes = await patchPost(postInfo!.boardIdx as unknown as string, userIdx ?? 0);
        if (updatedRes.ok) {
          return updatedRes.data as IPost;
        } else {
          throw Error(`fetch error: ${updatedRes.msg as string}`);
        }
      };

      alert(`수정이 완료되었습니다.`);
      fetchPostData()
        .then((data) => setPostInfo(data))
        .catch(alert);
      setModalClose();
    } else alert(res.msg);
  };

  const onClickSubmit = async (boardStatus: string) => {
    checkInputs();

    const res = await postPost({
      userIdx,
      title: postTitleRef.current!.value,
      content: postTextRef.current!.value,
      onOff,
      categoryName,
      capacityNum,
      recruitmentPart,
      area,
      techstacks,
      boardStatus,
    });

    if (res.ok) {
      alert(`${boardStatus === '임시저장' ? '임시저장' : '글 작성'}이 완료되었습니다.`);
      setModalClose();
    } else alert(res.msg);
  };

  return (
    <ContentWrapper>
      <MainTitle>팀원 구하자</MainTitle>
      <FormWrapper>
        <OptionSection>
          <OptionTitle>분야</OptionTitle>
          <OptionSelect>
            {['프로젝트', '대회', '스터디'].map((text, idx) => (
              <SelectedButton onClick={() => setCategoryName(text)} selected={text === categoryName} key={idx}>
                {text}
              </SelectedButton>
            ))}
          </OptionSelect>
        </OptionSection>
        <OptionSection>
          <OptionTitle>지역</OptionTitle>
          <SelectDropDown value={area} onChange={(e) => setArea(e.target.value)}>
            {['서울', '수원', '인천', '대구', '부산', '울산', '광주', '전주', '대전', '세종', '천안', '청주', '원주', '제주', '기타'].map((text, idx) => (
              <option value={text} key={idx}>
                {text}
              </option>
            ))}
          </SelectDropDown>
        </OptionSection>
        <OptionSection>
          <OptionTitle>모집 인원</OptionTitle>
          <SelectDropDown value={capacityNum === 9 ? '9+' : capacityNum.toString()} onChange={(e) => setCapacityNum(Number(e.target.value[0]))}>
            {['1', '2', '3', '4', '5', '6', '7', '8', '9+'].map((text, idx) => (
              <option value={text} key={idx}>
                {text}
              </option>
            ))}
          </SelectDropDown>
        </OptionSection>
        <OptionSection>
          <OptionTitle>모집 파트</OptionTitle>
          <OptionSelect>
            {recruitmentPartList.map((text, idx) =>
              idx <= 3 ? (
                <SelectedButton
                  onClick={() => setRecruitmentPart((p) => (p.includes(text) ? p.filter((v) => v !== text) : [...p, text]))}
                  selected={recruitmentPart.includes(text)}
                  key={idx}
                >
                  {text}
                </SelectedButton>
              ) : (
                <SelectedButton selected={true} key={idx}>
                  {text}
                  <SelectedDelete onClick={() => setRecruitmentPartList((s) => s.filter((v, idx) => idx <= 3 && v !== text))}>X</SelectedDelete>
                </SelectedButton>
              ),
            )}
            {isNewPartAdding && <AddInputButton ref={addInputRef} onKeyUp={onKeyUpAddPartInput} maxWidth={newPartWidth} />}
            <HiddenSpan ref={hiddenSpanRef} />
            <AddButton
              onClick={() => {
                setIsNewPartAdding((now) => !now);
                setTimeout(() => addInputRef.current?.focus(), 0);
              }}
            >
              {isNewPartAdding ? '-' : '+'}
            </AddButton>
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
            <SelectDropDown defaultValue="선택" onChange={(e) => !techstacks.includes(e.target.value) && setTechStacks((s) => [...s, e.target.value])}>
              <option disabled hidden>
                선택
              </option>
              {['JavaScript', 'TypeScript', 'Node.js', 'Spring', 'Python', 'React', 'Vue', 'Angular', 'Kotlin'].map((text, idx) => (
                <option value={text} key={idx}>
                  {text}
                </option>
              ))}
            </SelectDropDown>
            <OptionSelect>
              {techstacks.map((text, idx) => (
                <SelectedButton selected={true} key={idx}>
                  {text}
                  <SelectedDelete onClick={() => setTechStacks((s) => s.filter((v) => v !== text))}>X</SelectedDelete>
                </SelectedButton>
              ))}
            </OptionSelect>
          </div>
        </OptionSection>
        <OptionSection>
          <InputTitle ref={postTitleRef} spellCheck={false} placeholder="제목" type="text" />
        </OptionSection>
        <TextareaPost
          ref={postTextRef}
          spellCheck={false}
          placeholder="진행 예상 기간, 진행 방식(온라인/오프라인)과 신청 방법 등 필요한 사항을 자세히 기재해주세요."
        />
        {isEdit && (
          <SubmitButton siblings={1} onClick={onClickEdit}>
            수정완료
          </SubmitButton>
        )}

        {!isEdit && (
          <OptionSelect>
            <SubmitButton siblings={3} onClick={() => onClickSubmit('임시저장')}>
              임시저장
            </SubmitButton>
            <SubmitButton siblings={3}>임시저장한 글</SubmitButton>
            <SubmitButton siblings={3} onClick={() => onClickSubmit('모집중')}>
              작성 완료
            </SubmitButton>
          </OptionSelect>
        )}
      </FormWrapper>
    </ContentWrapper>
  );
}

function TempWrite() {
  return (
    <ContentWrapper>
      <MainTitle>임시저장한 글</MainTitle>
    </ContentWrapper>
  );
}

function WriteModal({ isEdit, postInfo, setModalClose, setPostInfo, visible }: WriteModalProps) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      setTimeout(() => dispatch(clearState()), 200);
    },
    [visible],
  );

  return (
    <Modal
      children={<Write isEdit={isEdit} postInfo={postInfo} setPostInfo={setPostInfo} setModalClose={setModalClose} />}
      visible={visible}
      onClickClose={setModalClose}
    ></Modal>
  );
}

export default WriteModal;
