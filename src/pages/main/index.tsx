import styled from 'styled-components';

const MainWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 40px;

  height: calc(100vh - 140px);
  overflow-y: scroll;
`;

const MainIMG = styled.div`
  position: relative;

  height: 550px;
  background-color: var(--color-yellow);
`;

function Main() {
  return (
    <MainWrapper>
      <MainIMG />
      <div>검색</div>
      <div>JS, TS, Spring, Django</div>
      <div>최신순 인기순</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
      <div>웹 프로젝트 함께할 열정 넘치는 팀원 모집합니다.</div>
    </MainWrapper>
  );
}

export default Main;
