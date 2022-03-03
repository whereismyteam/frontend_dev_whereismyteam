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
  onClickReplySubmit: (
    setIsReplyOn: React.Dispatch<React.SetStateAction<boolean>>,
    ReplyRef: React.RefObject<HTMLTextAreaElement>,
    parentCommentIdx: number,
    commentInput: string,
    isSecret: boolean,
  ) => Promise<void>;
  onClickDeleteComment: (commentIdx: number) => Promise<void>;
}

const CommentBox = styled.div`
  position: relative;
  padding: 20px;
  width: calc(100% - 40px);
  box-shadow: 3px 3px 5px 2px rgba(149, 149, 149, 0.5);
  border-radius: 10px;
  background-color: #fff;
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
  line-height: 20px;
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

function CommentLayout({
  commentIdx,
  userImg,
  userName,
  text,
  date,
  isPrivate,
  ownerIdx,
  parentOwnerIdx,
  parentCommentIdx,
  onClickReplySubmit,
  onClickDeleteComment,
  childrens,
}: {
  commentIdx: number;
  userImg: string;
  userName: string;
  text: string;
  date: string;
  isPrivate: boolean;
  ownerIdx: number;
  parentOwnerIdx?: number;
  parentCommentIdx: number;
  onClickReplySubmit: (
    setIsReplyOn: React.Dispatch<React.SetStateAction<boolean>>,
    ReplyRef: React.RefObject<HTMLTextAreaElement>,
    parentCommentIdx: number,
    commentInput: string,
    isSecret: boolean,
  ) => Promise<void>;
  onClickDeleteComment: (commentIdx: number) => Promise<void>;
  childrens?: IComment[];
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

  const renderChildrens = (childrens: IComment[]) => {
    return (
      <>
        {childrens.map((reply, idx) => (
          <ReplyWrapper key={idx}>
            <ReplyImg src={Reply} alt="L" />
            <CommentLayout
              commentIdx={reply.commentIdx}
              userImg={`/profileImg/${reply.member.profileImgIdx}.png`}
              userName={reply.member.userName}
              text={reply.comment}
              date={reply.createdAt}
              isPrivate={reply.isSecret === 'Y'}
              ownerIdx={reply.member.userIdx}
              parentOwnerIdx={ownerIdx}
              parentCommentIdx={reply.commentIdx}
              onClickReplySubmit={onClickReplySubmit}
              onClickDeleteComment={onClickDeleteComment}
              childrens={reply.children}
            />
          </ReplyWrapper>
        ))}
      </>
    );
  };

  return (
    <>
      <Layout>
        <br />
        <FlexRow>
          <UserWrapper>
            <UserImg src={userImg} />
            &nbsp;&nbsp;&nbsp;{userName}&nbsp;&nbsp;&nbsp;{isPrivate && <img src={Secret} alt="(비밀)" />}
          </UserWrapper>
          {userIdx === ownerIdx && <DeleteImg onClick={() => onClickDeleteComment(commentIdx)} src={Delete} alt="삭제" />}
        </FlexRow>
        <br />
        <br />
        {!isPrivate && (
          <>
            <pre>
              <Text>{text}</Text>
            </pre>
            <EtcWrapper>
              <Date>{date.replaceAll('-', '.').replace('T', '.').slice(0, -3)}</Date>
              <DefaultBtn btnName="답글" width={75} height={35} color="invBlue" onClick={onClickReply} />
            </EtcWrapper>
          </>
        )}
        {isPrivate &&
          (userIdx === ownerIdx || userIdx === parentOwnerIdx ? (
            <>
              <pre>
                <Text>{text}</Text>
              </pre>
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
            <pre>
              <CommentInputBox ref={commentTextRef} onChange={onChangeComment} placeholder="댓글을 입력하세요" />
            </pre>
            <br />
            <br />
            <CommentButtons>
              <FlexRow>
                <PrivateCheckBox onClick={() => setIsPrivateComment((now) => !now)}>{isPrivateComment && <img src={CheckedGray} />}</PrivateCheckBox>
                <span>비밀댓글</span>
              </FlexRow>
              <DefaultBtn
                onClick={() => onClickReplySubmit(setIsReplyOn, commentTextRef, parentCommentIdx, commentTextRef.current?.value as string, isPrivateComment)}
                btnName="등록"
                width={75}
                height={35}
                color="blue"
                disabled={!enableSubmitButton}
              />
            </CommentButtons>
          </>
        )}
        {childrens && !!childrens.length && renderChildrens(childrens)}
      </Layout>
    </>
  );
}

function Comment({ comment, onClickReplySubmit, onClickDeleteComment }: CommentProps) {
  return (
    <>
      <CommentBox>
        <CommentLayout
          commentIdx={comment.commentIdx}
          userImg={`/profileImg/${comment.member.profileImgIdx}.png`}
          userName={comment.member.userName}
          text={comment.comment}
          date={comment.createdAt}
          isPrivate={comment.isSecret === 'Y'}
          ownerIdx={comment.member.userIdx}
          parentCommentIdx={comment.commentIdx}
          onClickReplySubmit={onClickReplySubmit}
          onClickDeleteComment={onClickDeleteComment}
        />
        {comment.children.map((reply, idx) => (
          <ReplyWrapper key={idx}>
            <ReplyImg src={Reply} alt="L" />
            <CommentLayout
              commentIdx={reply.commentIdx}
              userImg={`/profileImg/${reply.member.profileImgIdx}.png`}
              userName={reply.member.userName}
              text={reply.comment}
              date={reply.createdAt}
              isPrivate={reply.isSecret === 'Y'}
              ownerIdx={reply.member.userIdx}
              parentOwnerIdx={comment.member.userIdx}
              parentCommentIdx={reply.commentIdx}
              onClickReplySubmit={onClickReplySubmit}
              onClickDeleteComment={onClickDeleteComment}
              childrens={reply.children}
            />
          </ReplyWrapper>
        ))}
      </CommentBox>
    </>
  );
}

export default Comment;
