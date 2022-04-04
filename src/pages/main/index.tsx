import { useState, useEffect, useRef, useCallback } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

// import SearchTitleBox from '../../components/common/searchTitleBox';
import mainBanner from '../../assets/images/mainBanner.png';
import Card from '../../components/card';
import Skeletons from '../../components/card/skeleton';
import LeftIndex from '../../components/leftIndex';
import StackBtn from '../../components/button/stackBtn';
import { patchPostView } from '../../apis';

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

const SearchBarInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchBarInfo = styled.div`
  width: 305px;
  height: 38px;
  background: var(--color-light-yellow);
  border-radius: 15px 15px 0px 0px;
`;

const SearchBarInfoH3 = styled.h3`
  box-sizing: border-box;
  padding-top: 10px;
  color: var(--color-blue);
  font-size: var(--font-size-base);
  font-weight: bold;
  text-align: center;
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
  position: relative;
  margin-top: 45px;
  margin-left: 4.5px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ObserverDiv = styled.div`
  position: absolute;
  bottom: 0;
`;
export interface ICard {
  boardIdx: number;
  category: string;
  stackList: string[]; // 스택 리스트
  title: string; // 제목
  detail: {
    // 지역, 모집인원, 호의방식, 모집파트
    location: string;
    number: number;
    onOff: string;
    parts: string[];
  };
  boardStatus: string;
  writer: {
    userIdx: number;
    profileImgIdx: number;
    userName: string; // 작성자 닉네임
  };
  createdAt: string;
  watch: number; // 조회수
  heart: number; // 하트수
  totalComent: number;
  isHeart: string;
}

export interface IPostViewData {
  userIdx: number;
  categoryIdx: number;
  lastArticleIdx: number;
  meeting: boolean;
  liked: boolean;
  tectStacksObj: {
    tech_stacks: string[];
  };
}

function Main({
  userIdx,
  isInfoLoaded,
  patchPostViewData,
  setPatchPostViewData,
}: {
  userIdx: number;
  isInfoLoaded: boolean;
  patchPostViewData: IPostViewData;
  setPatchPostViewData: React.Dispatch<React.SetStateAction<IPostViewData>>;
}) {
  //fetch post
  // const InitialData = {
  //   userIdx: 0,
  //   categoryIdx: 1,
  //   lastArticleIdx: 0,
  //   meeting: false,
  //   liked: false,
  //   tectStacksObj: {
  //     tech_stacks: [],
  //   },
  // };
  const [postView, setPostView] = useState<Array<ICard> | null>(null);
  // const [patchPostViewData, setPatchPostViewData] = useState<IPostViewData>(InitialData);
  const [loading, setLoading] = useState(true);

  const fetchPostView = async (data: IPostViewData) => {
    const res = await patchPostView(data);
    if (res.ok) {
      return res.data as Array<ICard>;
    } else if (res.msg === '더이상 조회되는 게시글이 없습니다.') {
      setPostView(null);
      return null;
    } else {
      throw Error(`fetch error: ${res.msg}`);
    }
  };

  // stackList
  const stackfirstLineList = ['JavaScript', 'TypeScript', 'Node.js', 'Python', 'Spring', 'React'];
  const stackSecondLineList = ['Angular', 'Kotlin', 'Flutter', 'Swift', 'Java', 'Vue', 'Go', 'C++', 'C', 'Django'];

  const [stackList, setStackList] = useState<Set<string>>(new Set());

  // checkbox
  const [lastestChecked, setLastestChecked] = useState(true);
  const [likedChecked, setLikedChecked] = useState(false);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.value;
    if (checkboxValue === 'lastest') {
      if (likedChecked) {
        setLikedChecked((prev) => !prev);
        setLastestChecked((prev) => !prev);
      } else {
        setLastestChecked((prev) => !prev);
      }
      setPatchPostViewData((prev) => {
        return { ...prev, liked: false, lastArticleIdx: 0 };
      });
    } else {
      if (lastestChecked) {
        setLastestChecked((prev) => !prev);
        setLikedChecked((prev) => !prev);
      } else {
        setLikedChecked((prev) => !prev);
      }
      setPatchPostViewData((prev) => {
        return { ...prev, liked: true, lastArticleIdx: 0 };
      });
    }
  };

  const onChangeMeetingCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ischecked = e.target.checked;
    setPatchPostViewData((prev) => {
      return { ...prev, meeting: ischecked, lastArticleIdx: 0 };
    });
  };

  useEffect(() => {
    // userIdx: false(undefined) => 바로 패치
    // userIdx: true => isInfoloaded: true일때 패치
    if (!userIdx || (userIdx && isInfoLoaded)) {
      setLoading(true);
      fetchPostView(patchPostViewData)
        .then((data) => setPostView(data))
        .catch(alert)
        .finally(() => setLoading(false));
    }
  }, [
    patchPostViewData.userIdx,
    patchPostViewData.categoryIdx,
    patchPostViewData.liked,
    patchPostViewData.meeting,
    // patchPostViewData.lastArticleIdx,
    patchPostViewData.tectStacksObj.tech_stacks,
  ]);

  useEffect(() => {
    if (patchPostViewData.lastArticleIdx !== 0) {
      setLoading(true);
      fetchPostView(patchPostViewData)
        .then((data) => setPostView((prev) => (prev && data ? ([...prev, ...data] as Array<ICard>) : prev)))
        .catch(alert)
        .finally(() => setLoading(false));
    }
  }, [patchPostViewData.lastArticleIdx]);

  // Infinite scroll
  // setPostview에 ...prev, 데이터 추가, -> 리렌더링

  // const [isObserved, setIsObserved] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [isObserveLoading, setIsObserveLoading] = useState(false);
  const PostListBoxRef = useRef<HTMLUListElement | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  // const observer = new IntersectionObserver(([entry]) => setIsObserved(entry.isIntersecting), { threshold: 1 });

  const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !isObserveLoading) {
      observer.unobserve(entry.target);
      setIsObserveLoading(true);
      console.log(target?.offsetTop);
      let postNum: any;
      if (PostListBoxRef) {
        postNum = PostListBoxRef.current?.children.length;
      }
      if ((postNum - 7) % 9 == 0) {
        setPatchPostViewData((prev) => {
          return { ...prev, lastArticleIdx: 9 };
        });
      }
      setIsObserveLoading(false);
      // observer.observe(entry.target);
    }
  };

  // useEffect(() => {
  //   let observer: IntersectionObserver;
  //   console.log(PostListBoxRef.current?.children.length);
  //   if (target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0,
  //     });
  //     observer.observe(target);
  //   }
  // }, [target, target?.offsetTop]);

  const getObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([entries]: IntersectionObserverEntry[]) => {
        if (entries.isIntersecting) {
          let postNum: any;
          if (PostListBoxRef) {
            postNum = PostListBoxRef.current?.children.length;
          }
          if ((postNum - 1) % 9 == 0) {
            setPatchPostViewData((prev) => {
              return { ...prev, lastArticleIdx: 9 };
            });
          }
        }
      });
    }
    return observerRef.current;
  }, [observerRef.current]);

  useEffect(
    () => {
      if (fetchMoreRef.current) getObserver().observe(fetchMoreRef.current);
    },
    // if (fetchMoreRef.current) observer.observe(fetchMoreRef.current);
    // if (isObserved) {
    //   setPatchPostViewData((prev) => {
    //     return { ...prev, lastArticleIdx: postView!.length };
    //   });
    // }
    [fetchMoreRef.current],
  );

  console.log('렌더링됨');
  return (
    <MainWrapper>
      <LeftIndexWrapper>
        <LeftIndex setPatchPostViewData={setPatchPostViewData} />
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
        <SearchBarInfoWrapper>
          <SearchBarInfo>
            <SearchBarInfoH3>찾고싶은 스택을 클릭해보세요!</SearchBarInfoH3>
          </SearchBarInfo>
        </SearchBarInfoWrapper>
        <SearchStackWrapper>
          {/* <SearchTitleBox location={'main'} /> */}
          {stackfirstLineList.map((stack) => (
            <StackBtn key={stack} btnName={`${stack}`} stackList={stackList} setStackList={setStackList} setPatchPostViewData={setPatchPostViewData} />
          ))}
        </SearchStackWrapper>
        <SearchStackWrapper>
          {stackSecondLineList.map((stack) => (
            <StackBtn key={stack} btnName={`${stack}`} stackList={stackList} setStackList={setStackList} setPatchPostViewData={setPatchPostViewData} />
          ))}
        </SearchStackWrapper>
      </SearchBarWrapper>
      <PostListWrapper>
        <PostListGuideWrapper>
          <PostListGuideLeft>
            <PostListGuideBox>
              <CheckBox type="checkbox" value="lastest" checked={lastestChecked} onChange={onChangeCheckbox} />
              <CheckBoxDetail>최신순</CheckBoxDetail>
            </PostListGuideBox>
            <PostListGuideBox>
              <CheckBox type="checkbox" value="liked" checked={likedChecked} onChange={onChangeCheckbox} />
              <CheckBoxDetail>인기순</CheckBoxDetail>
            </PostListGuideBox>
          </PostListGuideLeft>
          <PostListGuideRight>
            <PostListGuideBox>
              <CheckBox type="checkbox" value="meeting" onChange={onChangeMeetingCheckbox} />
              <CheckBoxDetail>모집 중인 공고만 보기</CheckBoxDetail>
            </PostListGuideBox>
          </PostListGuideRight>
        </PostListGuideWrapper>
        <PostListBox ref={PostListBoxRef}>
          {/* {loading ? (
            <Skeletons />
          ) : postView ? (
            postView.length <= 8 && postView.map((data: ICard) => <Card key={data.boardIdx} data={data} />)
          ) : (
            '해당 게시글이 존재하지 않습니다'
          )} */}
          {postView ? (
            loading && postView.length <= 9 ? (
              <Skeletons />
            ) : (
              postView.map((data: ICard) => <Card key={data.boardIdx} data={data} />)
            )
          ) : (
            '해당 게시글이 존재하지 않습니다'
          )}
          {/* {!loading && postView!.length >= 9 && postView!.map((data: ICard) => <Card key={data.boardIdx} data={data} />)} */}
          <ObserverDiv ref={fetchMoreRef} />
          {isObserveLoading ? <Skeletons /> : <></>}
        </PostListBox>
      </PostListWrapper>
    </MainWrapper>
  );
}

export default Main;
