import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Comment, { IComment } from './comment';
import { BtnWrapper } from '../../components/button/defaultBtn';
import Watch from '../../assets/images/watch.svg';
import Heart from '../../assets/images/heart.svg';
import BackBtn from '../../assets/images/backBtn.svg';
import LoadingSpinner from '../../assets/styles/loadingSpinner';

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
  margin-bottom: 20px;
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
const PostText = styled.div``;
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

const CommentWrapper = styled.div`
  width: 100%;
  align-items: flex-start;
`;

const CommentInputBox = styled.textarea`
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

const BackBtnImg = styled.img`
  position: fixed;
  z-index: 1;
  opacity: 0.5;
  left: 0;
  :hover {
    cursor: pointer;
  }
`;

function DetailLine({ title, value }: { title: string; value: string }) {
  return (
    <Detail>
      <DetailTitle>{title}</DetailTitle>
      <DetailValue>{value}</DetailValue>
    </Detail>
  );
}

const POST_TEXT = `(임시글)해커톤(hackathon)이란 해킹(hacking)과 마라톤(marathon)의 합성어로 기획자, 개발자, 디자이너 등의 직군이 팀을 이루어 제한 시간 내 주제에 맞는 서비스를 개발하는 공모전이다. 교육을 목표로 하거나 새로운 소프트웨어의 개발, 또는 기존 소프트웨어의 개선을 목표로 하는 경우가 많다. 프로그래밍 언어, 운영 체제, 응용 프로그램, API 등의 특정한 주제를 정해 놓고 열리는 경우도 있고, 그러한 제한 없이 열리는 경우도 있다.

프로젝트(영어: project)는 일정한 기간 안에 일정한 목적을 달성하기 위해 수행하는 업무의 묶음을 말한다. 하나의 프로젝트는 정해진 기간, 배정된 금액, 투입인력 등 일정한 제약조건 하에서 각종 요구사항(requirement)을 수행하는 방식으로 진행된다.

사이드 프로젝트는 프로젝트 중에서도 소규모, 비공식, 개인적인 성격을 가지는 프로젝트를 말한다. 수익이나 성과보다 가치나 실험에 중심을 둔 목표를 이루려고 할 때 자연스럽게 사이드 프로젝트가 되는 경우가 많다.`;

const DATA = {
  stackList: ['JavaScript', 'TypeScript', 'Node.js', 'Python'],
  title: '웹프로젝트 함께할 열정 넘치는 팀원 모집합니다.',
  detail: {
    location: '서울',
    number: 4,
    onOff: '온/오프',
    parts: ['백엔드', '프론트엔드'],
  },
  postText: POST_TEXT,
  isAvailable: true,
  userImg: 'https://d1fdloi71mui9q.cloudfront.net/HR7SF2QrSImI4ol8XNQh_NvAsCZ89ThPrjr0i',
  userName: 'USER_NAME',
  date: '2021-12-25',
  watch: 125,
  heart: 15,
};

const COMMENTS_LIST = [
  {
    userImg: 'https://d1fdloi71mui9q.cloudfront.net/HR7SF2QrSImI4ol8XNQh_NvAsCZ89ThPrjr0i',
    userName: 'USER_NAME1',
    text: `댓글 어쩌구저쩌구 저도 참여하고 싶은데 신청은 어떻게 하면 되나요? 신청하는 방법 알려주시면 신청하도록 하겠습니다.`,
    date: `2022.12.25.12:00`,
    isPrivate: false,
    children: [
      {
        userImg: 'https://d1fdloi71mui9q.cloudfront.net/HR7SF2QrSImI4ol8XNQh_NvAsCZ89ThPrjr0i',
        userName: 'USER_NAME2',
        text: `댓글 어쩌구저쩌구 저도 참여하고 싶은데 신청은 어떻게 하면 되나요? 신청하는 방법 알려주시면 신청하도록 하겠습니다.`,
        date: `2022.12.25.12:00`,
        isPrivate: true,
      },
    ],
  },
];
interface IPost {
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
  isAvailable: boolean; // 모집중 or 모집완료
  userImg: string; // 작성자 프로필 사진 URL
  userName: string; // 작성자 닉네임
  date: string; // 시간
  watch: number; // 조회수
  heart: number; // 하트수
}
function Post() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState<IPost | null>(null);
  const [commentsList, setCommentsList] = useState<Array<IComment>>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPostInfo(DATA);
      setCommentsList(COMMENTS_LIST);
      setLoading(false);
    }, 200);
  }, []);

  const onClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <>
      <BackBtnImg src={BackBtn} onClick={onClickBackBtn} />
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
            <PostTitle>웹프로젝트 함께할 열정 넘치는 팀원 모집합니다.</PostTitle>
            <DetailInfoWrapper>
              <DetailLine title="지역" value="서울" />
              <DetailLine title="모집인원" value="4명" />
              <DetailLine title="회의방식" value="온/오프" />
              <DetailLine title="모집파트" value="#백엔드" />
            </DetailInfoWrapper>
          </InfoWrapper>
          <PostText>{POST_TEXT}</PostText>
          <AvailableBox width={125} height={35} color="invBlue">
            모집중
          </AvailableBox>
          <UserWrapper>
            <UserImg src={postInfo!.userImg} />
            &nbsp;&nbsp;&nbsp;{postInfo!.userName}
          </UserWrapper>
          <EtcWrapper>
            <Date>{postInfo!.date}</Date>
            <EtcInfo>
              <img src={Watch} /> <span>&nbsp;{postInfo!.watch}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <img src={Heart} /> <span>&nbsp;{postInfo!.heart}</span>
            </EtcInfo>
          </EtcWrapper>
          <CommentWrapper>
            <br />
            <br />
            <h1>댓글 작성하기</h1>
            <br />
            <br />
            <CommentInputBox placeholder="댓글을 입력하세요" />
            <br />
            <br />
            {commentsList.map((comment, idx) => (
              <Comment key={idx} comment={comment} />
            ))}
          </CommentWrapper>
        </ContentWrapper>
      )}
    </>
  );
}

export default Post;
