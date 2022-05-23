import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Watch from '../../assets/images/watch.svg';
import Comment from '../../assets/images/comment.svg';
import Heart from '../../assets/images/heart.svg';
import Hearted from '../../assets/images/hearted.svg';
import { ICard } from '../../pages/main';

const PostWrapper = styled.li`
  padding-top: 36px;
  margin: 21px 14.5px;
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
  align-items: center;
  justify-content: center;
`;

const PostLeftBarInner = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const PostLeftBarImg = styled.img`
  width: 36.3px;
  margin: 5px 0;
`;

const PostContentWrapper = styled.div`
  width: 173px;
`;

const PostContentWrapperInner = styled.div`
  margin: 0 auto;
  width: 138px;
  display: flex;
  flex-direction: column;
`;

const PostContentInfoWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  width: 200px;
  transform: translateX(-8px);
`;

const PostContentInfo = styled.div`
  box-sizing: border-box;
  height: 21px;
  background: #fff;
  color: var(--color-blue);
  border: 1px solid var(--color-yellow);
  border-radius: 30px;
  font-size: var(--font-size-small-2);
  padding: 3.5px 7px 0 7px;
  margin: 0 2.5px;
`;

const PostContentTitle = styled.h3`
  margin-top: 12px;
  font-size: var(--font-size-base-2);
  font-weight: bold;
  line-height: 18px;
  color: #000;
  cursor: pointer;
`;

const PostContentTagWrapper = styled.ul`
  margin-top: 20px;
  max-width: 100px;
  display: flex;
  flex-wrap: wrap;
`;

const PostContentTag = styled.li`
  color: var(--color-blue);
  font-size: var(--font-size-small-2);
  margin: 3px 1px;
`;

const PostContentEtcWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  width: 93px;
  justify-content: space-between;
`;

const PostContentEtc = styled.div`
  display: flex;
`;

const PostContentEtcImg = styled.img`
  height: 9.5px;
`;

const PostContentEtcSpan = styled.span`
  margin-left: 3px;
  color: #000;
  font-size: var(--font-size-small-2);
`;

function Card({ data }: { data: ICard }) {
  return (
    <PostWrapper>
      <PostBox>
        <PostMarker>
          <PostMarkerBackground>
            <PostMarkerBackgroundWhite />
            <PostMarkerText>{data.detail.number}명</PostMarkerText>
          </PostMarkerBackground>
        </PostMarker>
        <PostLeftBar>
          <PostLeftBarInner>
            {data.stackList.map((item) => (
              <PostLeftBarImg key={item} src={`/stacks/${item}.png`} />
            ))}
          </PostLeftBarInner>
        </PostLeftBar>
        <PostContentWrapper>
          <PostContentWrapperInner>
            <PostContentInfoWrapper>
              <PostContentInfo>{data.boardStatus}</PostContentInfo>
              <PostContentInfo>{data.detail.location}</PostContentInfo>
              <PostContentInfo>{data.detail.onOff}</PostContentInfo>
            </PostContentInfoWrapper>
            <Link to={`/post/${data.boardIdx}`} style={{ textDecoration: 'none' }}>
              <PostContentTitle>{data.title}</PostContentTitle>
            </Link>
            <PostContentTagWrapper>
              {data.detail.parts.map((p) => (
                <PostContentTag key={p}>#{p}</PostContentTag>
              ))}
            </PostContentTagWrapper>
            <PostContentEtcWrapper>
              <PostContentEtc>
                <PostContentEtcImg src={Watch} />
                <PostContentEtcSpan>{data.watch}</PostContentEtcSpan>
              </PostContentEtc>
              <PostContentEtc>
                <PostContentEtcImg src={Comment} />
                <PostContentEtcSpan>{data.totalComent}</PostContentEtcSpan>
              </PostContentEtc>
              <PostContentEtc>
                <PostContentEtcImg src={data.isHeart === 'Y' ? Hearted : Heart} />
                <PostContentEtcSpan>{data.heart}</PostContentEtcSpan>
              </PostContentEtc>
            </PostContentEtcWrapper>
          </PostContentWrapperInner>
        </PostContentWrapper>
      </PostBox>
    </PostWrapper>
  );
}

export default Card;
