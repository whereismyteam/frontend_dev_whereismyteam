import styled from 'styled-components';

const PostWrapper = styled.li`
  padding-top: 36px;
`;

const PostMarker = styled.div`
  position: absolute;
  right: 16px;
  top: -36px;
`;

const PostMarkerBackground = styled.div`
  position: relative;
  width: 33px;
  height: 36px;
  background: #f8d274;
  display: flex;
  justify-content: center;
`;

const PostMarkerBackgroundWhite = styled.div`
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  border-left: 16.5px solid transparent;
  border-right: 16.5px solid transparent;
  border-top: 7px solid #fff;
`;

const PostMarkerText = styled.span`
  margin-top: 15px;
  color: #000;
  font-size: var(--font-size-small);
`;

const PostBox = styled.div`
  position: relative;
  width: 228px;
  height: 219px;
  background: #fff;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.25);
  display: flex;

  :hover {
    box-shadow: 0px 0px 10px 10px var(--color-yellow);
  }
`;

const PostLeftBar = styled.div`
  width: 55px;
  height: 100%;
  background: var(--color-blue);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const PostContentWrapper = styled.div`
  width: 173px;
`;

const PostContentTitle = styled.h3`
  font-size: var(--font-size-base-2);
  font-weight: bold;
  color: #000;
`;

const PostContentTagWrapper = styled.ul`
  max-width: 100px;
  display: flex;
  flex-wrap: wrap;
`;

const PostContentTag = styled.li`
  color: var(--color-blue);
  font-size: var(--font-size-small-2);
`;

const PostContentInfo = styled.div`
  display: flex;
`;

function Card() {
  return (
    <PostWrapper>
      <PostBox>
        <PostMarker>
          <PostMarkerBackground>
            <PostMarkerBackgroundWhite />
            <PostMarkerText>4명</PostMarkerText>
          </PostMarkerBackground>
        </PostMarker>
        <PostLeftBar></PostLeftBar>
        <PostContentWrapper>
          <PostContentTitle>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</PostContentTitle>
          <PostContentTagWrapper>
            <PostContentTag>#백엔드</PostContentTag>
            <PostContentTag>#프론트엔드</PostContentTag>
            <PostContentTag>#기획자</PostContentTag>
            <PostContentTag>#디자이너</PostContentTag>
          </PostContentTagWrapper>
        </PostContentWrapper>
      </PostBox>
    </PostWrapper>
  );
}

export default Card;
