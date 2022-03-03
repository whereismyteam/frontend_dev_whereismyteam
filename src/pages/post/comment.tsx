import styled from 'styled-components';

import DefaultBtn, { BtnWrapper } from '../../components/button/defaultBtn';
import Reply from '../../assets/images/reply.svg';
import Secret from '../../assets/images/secret.svg';
import { CommentButtons, CommentInputBox, FlexRow, PrivateCheckBox } from '.';
import { useRef, useState } from 'react';

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
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;
const Text = styled.p`
  font-size: 15px;
  overflow-wrap: break-word;
`;

const EtcWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Date = styled.div`
  color: #9d9d9d;
`;

const ReplyImg = styled.img`
  width: 15px;
  height: 15px;
  margin-top: 40px;
  padding-right: 10px;
`;

const ReplyBtn = styled(BtnWrapper)``;

function CommentLayout({ userImg, userName, text, date, isPrivate }: { userImg: string; userName: string; text: string; date: string; isPrivate: boolean }) {
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  const isPrivateRef = useRef<HTMLInputElement>(null);

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
      <UserWrapper>
        <UserImg src={userImg} />
        &nbsp;&nbsp;&nbsp;{userName}&nbsp;&nbsp;&nbsp;{isPrivate && <img src={Secret} alt="(비밀)" />}
      </UserWrapper>
      <br />
      <Text>{text}</Text>
      <EtcWrapper>
        <Date>{date}</Date>
        <DefaultBtn btnName="답글" width={75} height={35} color="invBlue" onClick={onClickReply} />
      </EtcWrapper>
      <br />
      {isReplyOn && (
        <>
          <CommentInputBox ref={commentTextRef} onChange={onChangeComment} placeholder="댓글을 입력하세요" />
          <br />
          <br />
          <CommentButtons>
            <FlexRow>
              <PrivateCheckBox type="checkbox" ref={isPrivateRef} defaultChecked={isPrivate} />
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
            />
          </ReplyWrapper>
        ))}
      </CommentBox>
    </>
  );
}

export default Comment;
