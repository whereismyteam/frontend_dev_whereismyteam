import styled from 'styled-components';

import DefaultBlueBtn, { BtnWrapper } from '../../components/button/defaultBtn';
import Reply from '../../assets/images/reply.svg';

export interface IComment {
  userImg: string; // 작성자 프로필 사진 URL
  userName: string; // 작성자 닉네임
  text: string; // 댓글 내용
  date: string; // 시간
  isPrivate: boolean; // 비밀댓글 여부
  children: Array<{
    userImg: string;
    userName: string;
    text: string;
    date: string;
    isPrivate: boolean;
  }>;
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
`;

const Layout = styled.div`
  overflow-wrap: break-word;
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
  return (
    <Layout>
      <br />
      <UserWrapper>
        <UserImg src={userImg} />
        &nbsp;&nbsp;&nbsp;{userName}&nbsp;&nbsp;&nbsp;{isPrivate && <div>(비밀)</div>}
      </UserWrapper>
      <br />
      <Text>{text}</Text>
      <EtcWrapper>
        <Date>{date}</Date>
        <DefaultBlueBtn btnName="답글" width={75} height={35} color="invBlue" />
      </EtcWrapper>
    </Layout>
  );
}

function Comment({ comment }: CommentProps) {
  return (
    <>
      <CommentBox>
        <CommentLayout userImg={comment.userImg} userName={comment.userName} text={comment.text} date={comment.date} isPrivate={comment.isPrivate} />
        {comment.children.map((reply) => (
          <ReplyWrapper>
            <ReplyImg src={Reply} alt="L" />
            <CommentLayout userImg={reply.userImg} userName={reply.userName} text={reply.text} date={reply.date} isPrivate={reply.isPrivate} />
          </ReplyWrapper>
        ))}
      </CommentBox>
    </>
  );
}

export default Comment;
