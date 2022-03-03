import styled from 'styled-components';

import DefaultBtn, { BtnWrapper } from '../../components/button/defaultBtn';
import Reply from '../../assets/images/reply.svg';
import Secret from '../../assets/images/secret.svg';
import Delete from '../../assets/images/delete.svg';
import CheckedGray from '../../assets/images/checkedGray.png';
import { CommentButtons, CommentInputBox, FlexRow, PrivateCheckBox } from '.';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store';

export interface IComment {
  commentIdx: number;
  isSecret: string;
  comment: string;
  member: {
    userIdx: number;
    profileImgIdx: number;
    userName: string; // 작성자 닉네임
  };
  createdAt: string; // 시간
  children: Array<IComment>;
  // 대댓글 시간순
}

interface CommentProps {
  comment: IComment;
}

const CommentBox = styled.div`
  position: relative;
  padding: 20px;
  width: calc(100% - 40px);
  box-shadow: 3px 3px 5px 2px rgba(149, 149, 149, 0.5);
  border-radius: 10px;
  background-color: #fff;
  opacity: 0.8;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  overflow-wrap: break-word;
  width: 100%;
`;

const ReplyWrapper = styled.div`
  display: flex;
`;

const UserWrapper = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
`;
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  filter: drop-shadow(5px 5px 5px #909090);
`;

const Text = styled.p`
  font-size: 15px;
  overflow-wrap: break-word;
`;

const EtcWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 35px;
`;

const Date = styled.div`
  color: #9d9d9d;
`;

const SecretText = styled.p`
  font-size: 15px;
  color: #9d9d9d;
`;

const ReplyImg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 40px;
  padding-right: 10px;
`;

const DeleteImg = styled.img`
  width: 15px;
  height: 15px;
  :hover {
    cursor: pointer;
  }
`;

const ReplyBtn = styled(BtnWrapper)``;

function CommentLayout({
  userImg,
  userName,
  text,
  date,
  isPrivate,
  ownerIdx,
  parentIdx,
}: {
  userImg: string;
  userName: string;
  text: string;
  date: string;
  isPrivate: boolean;
  ownerIdx: number;
  parentIdx?: number;
}) {
  const userIdx = useSelector((state: rootState) => state.user.userIdx);

  const commentTextRef = useRef<HTMLTextAreaElement>(null);

  const [isPrivateComment, setIsPrivateComment] = useState(false);
  const [isReplyOn, setIsReplyOn] = useState(false);
  const [enableSubmitButton, setEnableSubmitButton] = useState(false);

  const onClickReply = () => {
    setIsReplyOn((val) => !val);
  };

  const onChangeComment = () => {
    const commentInput = commentTextRef.current?.value;

    setEnableSubmitButton(!(commentInput === ''));
  };

  return (
    <Layout>
      <br />
      <FlexRow>
        <UserWrapper>
          <UserImg src={userImg} />
          &nbsp;&nbsp;&nbsp;{userName}&nbsp;&nbsp;&nbsp;{isPrivate && <img src={Secret} alt="(비밀)" />}
        </UserWrapper>
        {userIdx === ownerIdx && <DeleteImg src={Delete} alt="삭제" />}
      </FlexRow>
      <br />
      <br />
      {!isPrivate && (
        <>
          <Text>{text}</Text>
          <EtcWrapper>
            <Date>{date.replaceAll('-', '.').replace('T', '.').slice(0, -3)}</Date>
            <DefaultBtn btnName="답글" width={75} height={35} color="invBlue" onClick={onClickReply} />
          </EtcWrapper>
        </>
      )}
      {isPrivate &&
        (userIdx === ownerIdx || userIdx === parentIdx ? (
          <>
            <Text>{text}</Text>
            <EtcWrapper>
              <Date>{date.replaceAll('-', '.').replace('T', '.').slice(0, -3)}</Date>
              <DefaultBtn btnName="답글" width={75} height={35} color="invBlue" onClick={onClickReply} />
            </EtcWrapper>
          </>
        ) : (
          <>
            <SecretText>비밀댓글입니다.</SecretText>
            <EtcWrapper>
              <Date>{date.replaceAll('-', '.').replace('T', '.').slice(0, -3)}</Date>
            </EtcWrapper>
          </>
        ))}
      <br />
      {isReplyOn && (
        <>
          <CommentInputBox ref={commentTextRef} onChange={onChangeComment} placeholder="댓글을 입력하세요" />
          <br />
          <br />
          <CommentButtons>
            <FlexRow>
              <PrivateCheckBox onClick={() => setIsPrivateComment((now) => !now)}>{isPrivateComment && <img src={CheckedGray} />}</PrivateCheckBox>
              <span>비밀댓글</span>
            </FlexRow>
            <DefaultBtn btnName="등록" width={75} height={35} color="blue" disabled={!enableSubmitButton} />
          </CommentButtons>
        </>
      )}
    </Layout>
  );
}

function Comment({ comment }: CommentProps) {
  return (
    <>
      <CommentBox>
        <CommentLayout
          userImg={`/profileImg/${comment.member.profileImgIdx}.png`}
          userName={comment.member.userName}
          text={comment.comment}
          date={comment.createdAt}
          isPrivate={comment.isSecret === 'Y'}
          ownerIdx={comment.member.userIdx}
        />
        {comment.children.map((reply, idx) => (
          <ReplyWrapper key={idx}>
            <ReplyImg src={Reply} alt="L" />
            <CommentLayout
              userImg={`/profileImg/${reply.member.profileImgIdx}.png`}
              userName={reply.member.userName}
              text={reply.comment}
              date={reply.createdAt}
              isPrivate={reply.isSecret === 'Y'}
              ownerIdx={reply.member.userIdx}
              parentIdx={comment.member.userIdx}
            />
          </ReplyWrapper>
        ))}
      </CommentBox>
    </>
  );
}

export default Comment;
