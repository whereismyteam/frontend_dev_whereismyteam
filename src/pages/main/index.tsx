import styled from 'styled-components';

// import SearchTitleBox from '../../components/common/searchTitleBox';
import mainBanner from '../../assets/images/mainBanner.png';
import Card from '../../components/card';
import LeftIndex from '../../components/leftIndex';
import StackBtn from '../../components/button/stackBtn';
import { Link } from 'react-router-dom';

const MainWrapper = styled.div`
  position: relative;
  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

// Left Index

const LeftIndexWrapper = styled.div`
  position: absolute;
  top: 105px;
  left: 0;
  z-index: 999;
`;

// Main Banner
const MainBannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

const MainBannerImg = styled.img`
  position: absolute;
  width: 1029px;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
`;

const MainBannerBackground = styled.div`
  position: absolute;
  bottom: 23px;
  width: 100%;
  height: 248px;
  background-color: var(--color-light-yellow);
  display: flex;
  justify-content: center;
  z-index: -99;
`;

const MainBannerTitleWrapper = styled.div`
  position: relative;
  width: 515px;
`;

const MainBannerTitleH1 = styled.h1`
  margin: 10px auto 0;
  font-size: var(--font-size-large);
  font-weight: bold;
  color: #000;
  text-align: center;
  line-height: 46.44px;
  width: 460px;
`;

const MainBannerTitleH2 = styled.h2`
  margin-top: 55px;
  font-size: var(--font-size-mid);
  color: var(--color-pink-red);
  text-align: center;
`;

// Search Bar
const SearchBarWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 28px auto 0;
`;

const SearchStackWrapper = styled.div`
  display: flex;
  margin-top: 17px;
  justify-content: center;
`;

// Post List
const PostListWrapper = styled.div`
  width: 780px;
  margin: 75px auto 0;
`;

const PostListGuideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostListGuideLeft = styled.div`
  margin-left: 15px; /* 19px */
  width: 200px;
  display: flex;
  justify-content: space-between;
`;

const PostListGuideRight = styled.div`
  margin-right: 19px;
`;

const PostListGuideBox = styled.div`
  display: flex;
`;

const CheckBox = styled.input`
  width: 22px;
  height: 22px;
`;

const CheckBoxDetail = styled.span`
  margin-left: 5px;
  padding-top: 3px;
  font-size: var(--font-size-mid);
  color: #000;
`;

const PostListBox = styled.ul`
  margin-top: 45px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

import { mockMainData } from './mockData';

function Main() {
  const stackfirstLineList = ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'Spring', 'React'];
  const stackSecondLineList = ['Angular', 'Kotlin', 'Flutter', 'Swift', 'Java', 'Vue', 'Go', 'C++', 'C', 'Django'];

  return (
    <MainWrapper>
      <LeftIndexWrapper>
        <LeftIndex />
      </LeftIndexWrapper>
      <MainBannerWrapper>
        <MainBannerImg src={mainBanner} />
        <MainBannerBackground>
          <MainBannerTitleWrapper>
            <MainBannerTitleH2>백엔드, 프론트엔드, 디자이너, 기획자 등등</MainBannerTitleH2>
            <MainBannerTitleH1>프로젝트, 대회, 스터디 팀원 구인은 간편하게 구해줘 팀원에서!</MainBannerTitleH1>
          </MainBannerTitleWrapper>
        </MainBannerBackground>
      </MainBannerWrapper>
      <SearchBarWrapper>
        <Link to="/post/1"> test</Link>
        <SearchStackWrapper>
          {/* <SearchTitleBox location={'main'} /> */}
          {stackfirstLineList.map((stack) => (
            <StackBtn key={stack} btnName={`${stack}`} />
          ))}
        </SearchStackWrapper>
        <SearchStackWrapper>
          {stackSecondLineList.map((stack) => (
            <StackBtn key={stack} btnName={`${stack}`} />
          ))}
        </SearchStackWrapper>
      </SearchBarWrapper>
      <PostListWrapper>
        <PostListGuideWrapper>
          <PostListGuideLeft>
            <PostListGuideBox>
              <CheckBox type="checkbox" />
              <CheckBoxDetail>최신순</CheckBoxDetail>
            </PostListGuideBox>
            <PostListGuideBox>
              <CheckBox type="checkbox" />
              <CheckBoxDetail>인기순</CheckBoxDetail>
            </PostListGuideBox>
          </PostListGuideLeft>
          <PostListGuideRight>
            <PostListGuideBox>
              <CheckBox type="checkbox" />
              <CheckBoxDetail>모집 중인 공고만 보기</CheckBoxDetail>
            </PostListGuideBox>
          </PostListGuideRight>
        </PostListGuideWrapper>
        <PostListBox>
          {mockMainData.data.map((data) => (
            <Card key={data.boardIdx} data={data} />
          ))}
        </PostListBox>
      </PostListWrapper>
    </MainWrapper>
  );
}

export default Main;
