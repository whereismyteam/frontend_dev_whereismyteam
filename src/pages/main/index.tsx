import styled from 'styled-components';

import SearchTitleBox from '../../components/common/searchTitleBox';
import mainBanner from '../../assets/images/mainBanner.png';
import Card from '../../components/card';

const MainWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;

  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

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
  z-index: 99;
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
  margin-top: 10px;
  font-size: var(--font-size-large);
  font-weight: bold;
  color: #000;
  text-align: center;
  line-height: 46.44px;
`;

const MainBannerTitleH2 = styled.h2`
  margin-top: 55px;
  font-size: var(--font-size-mid);
  color: var(--color-pink-red);
  text-align: center;
`;

// searchBar
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

const SearchStackBtn = styled.div`
  height: 25px;
  background: rgba(35, 83, 187, 0.4);
  border-radius: 30px;
  color: #fff;
  padding: 7px 10px 0 10px;
  margin: 0 4.5px;
`;

// post list
const PostListWrapper = styled.div`
  width: 760px;
  margin: 75px auto 0;
`;

const PostListGuideWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PostListGuideLeft = styled.div`
  display: flex;
`;

const PostListGuideRight = styled.div``;

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

function Main() {
  return (
    <MainWrapper>
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
        <SearchStackWrapper>
          <SearchTitleBox location={'main'} />
          <SearchStackBtn>Javascript</SearchStackBtn>
          <SearchStackBtn>TypeScript</SearchStackBtn>
          <SearchStackBtn>Node.js</SearchStackBtn>
          <SearchStackBtn>Python</SearchStackBtn>
          <SearchStackBtn>Spring</SearchStackBtn>
          <SearchStackBtn>React</SearchStackBtn>
        </SearchStackWrapper>
        <SearchStackWrapper>
          <SearchStackBtn>Angular</SearchStackBtn>
          <SearchStackBtn>Kotlin</SearchStackBtn>
          <SearchStackBtn>Flutter</SearchStackBtn>
          <SearchStackBtn>Swift</SearchStackBtn>
          <SearchStackBtn>Java</SearchStackBtn>
          <SearchStackBtn>Vue</SearchStackBtn>
          <SearchStackBtn>Go</SearchStackBtn>
          <SearchStackBtn>C++</SearchStackBtn>
          <SearchStackBtn>C</SearchStackBtn>
          <SearchStackBtn>Django</SearchStackBtn>
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
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </PostListBox>
      </PostListWrapper>
    </MainWrapper>
  );
}

export default Main;
