import { MouseEvent, UIEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Comment, { IComment } from './comment';
import DefaultBtn, { BtnWrapper } from '../../components/button/defaultBtn';
import Watch from '../../assets/images/watch.svg';
import Heart from '../../assets/images/heart.svg';
import Hearted from '../../assets/images/hearted.svg';
import BackBtn from '../../assets/images/backBtn.svg';
import CheckedGray from '../../assets/images/checkedGray.png';
import LoadingSpinner from '../../assets/styles/loadingSpinner';
import { deleteComment, patchCancelLikes, patchPost, postComment, postLikes, postReply } from '../../apis/post';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';

const ContentWrapper = styled.div`
  position: relative;
  width: 60vw;
  min-width: 500px;
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  z-index: 2;
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const StackList = styled.div`
  display: flex;
  overflow-x: scroll;

  div + div {
    margin-left: 10px;
  }
  margin-bottom: 20px;
`;
const StackIcon = styled.div`
  padding: 8px 16px;
  border-radius: 30px;
  color: #fff;
  background-color: var(--color-blue);
`;

const PostTitle = styled.div`
  font-size: var(--font-size-large-2);
  font-weight: bold;
  margin-top: 3px;
  margin-bottom: 22px;
`;

const DetailInfoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  border: none;
  border-top: 2px solid #e7e7e7;
  border-bottom: 2px solid #e7e7e7;

  height: 200px;
  justify-content: space-evenly;
  box-shadow: 0px 5px 10px -10px #909090;
  margin-bottom: 20px;
`;

const Detail = styled.div`
  display: flex;
`;
const DetailTitle = styled.div`
  color: #9d9d9d;
  width: 100px;
`;
const DetailValue = styled.div``;
const PostText = styled.p`
  width: 100%;
  line-height: 25px;
  color: #373737;
`;
const AvailableBox = styled(BtnWrapper)`
  margin-top: 100px;
  align-self: end;
  cursor: default;
  :hover {
    color: var(--color-blue);
    background-color: #fff;
  }
`;
const UserWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  margin-top: 20px;
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  filter: drop-shadow(5px 5px 5px #909090);
`;

const EtcWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  padding-bottom: 30px;
  box-shadow: 0px 5px 10px -10px #909090;
`;

const Date = styled.div`
  color: #9d9d9d;
`;
const EtcInfo = styled.div`
  display: flex;
  align-items: center;
`;

const HeartImg = styled.img`
  width: 20px;
  height: 18px;

  :hover {
    cursor: pointer;
    width: 24px;
    height: 22px;
    transition: all 0.3s ease-out;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
  align-items: flex-start;
`;

export const CommentInputBox = styled.textarea`
  font-family: 'Infinity Sans';

  width: calc(100% - 20px);
  height: 80px;
  overflow-y: scroll;
  padding: 10px;
  border: none;
  box-shadow: 3px 3px 5px 2px rgba(35, 83, 187, 0.3);
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;

export const PrivateCheckBox = styled.div`
  position: relative;
  width: 21px;
  height: 22px;
  border: 1px solid #9d9d9d;
  margin-right: 5px;

  &:hover {
    background-color: #9d9d9d;
    opacity: 0.5;
  }
`;

const BackBtnImg = styled.img`
  position: fixed;
  z-index: 1;
  opacity: 0.5;
  left: 0;
  width: 30vw;
  height: 30vw;
  :hover {
    cursor: pointer;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

function DetailLine({ title, value }: { title: string; value: string }) {
  return (
    <Detail>
      <DetailTitle>{title}</DetailTitle>
      <DetailValue>{value}</DetailValue>
    </Detail>
  );
}

export interface IPost {
  boardIdx: number;
  category: string;
  stackList: string[]; // 스택 리스트
  title: string; // 제목
  detail: {
    // 지역, 모집인원, 호의방식, 모집파트
    location: string;
    number: number;
    onOff: string;
    parts: string[];
  };
  postText: string; // 내용
  boardStatus: string;
  writer: {
    userIdx: number;
    profileImgIdx: number;
    userName: string; // 작성자 닉네임
  };
  createdAt: string;
  watch: number; // 조회수
  heart: number; // 하트수
  isHeart: string;

  commentList: Array<IComment>;
}
function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const userIdx = useSelector((state: rootState) => state.user.userIdx);

  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  let mainSectionElement: Element;

  const [postInfo, setPostInfo] = useState<IPost | null>(null);

  const [enableSubmitButton, setEnableSubmitButton] = useState(false);
  const [isPrivateComment, setIsPrivateComment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offsetY, setOffsetY] = useState(0);

  const fetchPostData = async () => {
    const res = await patchPost(postId as string, userIdx ?? 0);
    if (res.ok) {
      return res.data as IPost;
    } else {
      throw Error(`fetch error: ${res.msg as string}`);
    }
  };

  const onScroll = () => setOffsetY(mainSectionElement.scrollTop);

  useEffect(() => {
    mainSectionElement = document.body.querySelector('#root')!.children[1];
    mainSectionElement.addEventListener('scroll', onScroll);
    setLoading(true);
    fetchPostData()
      .then((data) => setPostInfo(data))
      .catch(alert)
      .finally(() => setLoading(false));

    return () => {
      mainSectionElement.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onClickBackBtn = () => {
    navigate('/', { replace: true });
  };

  const onChangeComment = () => {
    const commentInput = commentTextRef.current?.value;

    setEnableSubmitButton(!(commentInput === ''));
  };

  const onClickHeart = async () => {
    const isHeart = postInfo!.isHeart;

    const res = await (isHeart == 'Y' ? patchCancelLikes(postId as string, userIdx) : postLikes(postId as string, userIdx));
    const newHearts = postInfo!.heart + (isHeart == 'Y' ? -1 : 1);
    const newIsHearts = isHeart == 'Y' ? 'N' : 'Y';

    if (res.ok) {
      setPostInfo((info) => {
        if (!info) return info;

        return { ...info, isHeart: newIsHearts, heart: newHearts };
      });
    } else alert(res.msg);
  };

  const onClickCommentSubmit = async () => {
    const commentInput = commentTextRef.current?.value as string;
    const isSecret = isPrivateComment;

    const res = await postComment(postId as string, userIdx, commentInput, isSecret);

    if (res.ok) {
      fetchPostData()
        .then((data) => setPostInfo(data))
        .catch(alert);
      commentTextRef.current!.value = '';
    } else alert(res.msg);
  };

  const onClickReplySubmit = async (
    setIsReplyOn: React.Dispatch<React.SetStateAction<boolean>>,
    ReplyRef: React.RefObject<HTMLTextAreaElement>,
    parentCommentIdx: number,
    commentInput: string,
    isSecret: boolean,
  ) => {
    const res = await postReply(postId as string, parentCommentIdx, userIdx, commentInput, isSecret);
    setIsReplyOn(false);
    if (res.ok) {
      fetchPostData()
        .then((data) => setPostInfo(data))
        .catch(alert);
      ReplyRef.current!.value = '';
    } else alert(res.msg);
  };

  const onClickDeleteComment = async (commentIdx: number) => {
    const res = await deleteComment(userIdx, commentIdx);
    if (res.ok)
      fetchPostData()
        .then((data) => setPostInfo(data))
        .catch(alert);
    else alert(res.msg);
  };

  return (
    <>
      <BackBtnImg src={BackBtn} onClick={onClickBackBtn} style={{ transform: `translateY(-${offsetY * 0.3}px)` }} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ContentWrapper>
          <InfoWrapper>
            <StackList>
              {postInfo!.stackList.map((stack) => (
                <StackIcon key={stack}>{stack}</StackIcon>
              ))}
            </StackList>
            <PostTitle>{postInfo!.title}</PostTitle>
            <DetailInfoWrapper>
              <DetailLine title="지역" value={postInfo!.detail.location} />
              <DetailLine title="모집인원" value={postInfo!.detail.number.toString()} />
              <DetailLine title="회의방식" value={postInfo!.detail.onOff} />
              <DetailLine title="모집파트" value={postInfo!.detail.parts.reduce((acc, part) => acc + `#${part} `, '')} />
            </DetailInfoWrapper>
          </InfoWrapper>
          <br />
          <br />
          <pre style={{ width: '100%' }}>
            <PostText>{postInfo!.postText}</PostText>
          </pre>
          <AvailableBox width={125} height={35} color="invBlue">
            {postInfo!.boardStatus}
          </AvailableBox>
          <UserWrapper>
            <UserImg src={`/profileImg/${postInfo!.writer.profileImgIdx}.png`} />
            &nbsp;&nbsp;&nbsp;{postInfo!.writer.userName}
          </UserWrapper>
          <EtcWrapper>
            <Date>{postInfo!.createdAt.substring(0, 10).replaceAll('-', '.')}</Date>
            <EtcInfo>
              <img src={Watch} /> <span>&nbsp;{postInfo!.watch}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <HeartImg onClick={onClickHeart} src={postInfo!.isHeart === 'Y' ? Hearted : Heart} /> <span>&nbsp;{postInfo!.heart}</span>
            </EtcInfo>
          </EtcWrapper>
          <CommentWrapper>
            <br />
            <br />
            <h1>댓글 작성하기</h1>
            <br />
            <br />
            <CommentInputBox ref={commentTextRef} onChange={onChangeComment} placeholder="댓글을 입력하세요" />
            <br />
            <br />
            <CommentButtons>
              <FlexRow>
                <PrivateCheckBox onClick={() => setIsPrivateComment((now) => !now)}>{isPrivateComment && <img src={CheckedGray} />}</PrivateCheckBox>
                <span>비밀댓글</span>
              </FlexRow>
              <DefaultBtn btnName="등록" width={75} height={35} color="blue" disabled={!enableSubmitButton} onClick={onClickCommentSubmit} />
            </CommentButtons>
            <br />
            <br />
            {postInfo!.commentList.map((comment, idx) => (
              <Comment key={idx} comment={comment} onClickReplySubmit={onClickReplySubmit} onClickDeleteComment={onClickDeleteComment} />
            ))}
          </CommentWrapper>
        </ContentWrapper>
      )}
    </>
  );
}

export default Post;
