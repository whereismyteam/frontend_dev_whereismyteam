import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DefaultButton from '../../components/button/defaultBtn';

const ContentWrapper = styled.div`
  position: relative;
  width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 40px;

  height: calc(100vh - 140px);
  overflow-y: scroll;
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
const UserWrapper = styled.div``;
const EtcWrapper = styled.div``;
const CommentWrapper = styled.div``;

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
};

function Post() {
  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState<{
    stackList: string[];
    title: string;
    detail: {
      location: string;
      number: number;
      onOff: string;
      parts: string[];
    };
    postText: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPostInfo(DATA);
      setLoading(false);
    }, 200);
  });

  console.log(postId);
  return (
    <>
      {loading ? (
        <div>로딩중</div>
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
          <UserWrapper></UserWrapper>
          <EtcWrapper></EtcWrapper>
          <CommentWrapper></CommentWrapper>
        </ContentWrapper>
      )}
    </>
  );
}

export default Post;
