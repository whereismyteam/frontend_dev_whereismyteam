import styled from 'styled-components';

import search from '../../assets/images/search.svg';

type Props = {
  location: string;
};

const navbarInputCSS = `
  padding-left: 37px;
  width: 800px;
  height: 50px;
`;

const mainInputCSS = `
  margin-right: 4.5px;
  padding-left: 20px;
  width: 300px;
  height: 32px;
`;

const navbarImgCSS = `
  top: 15.2px;
  right: 27.3px;
  width: 21.1px;
`;

const mainImgCSS = `
  top: 9.75px;
  right: 13.75px;
  width: 13.5px;
`;

const handleInput = (location: string) => {
  switch (location) {
    case 'nav':
      return navbarInputCSS;
    case 'main':
      return mainInputCSS;
    default:
      return mainInputCSS;
  }
};

const handleImg = (location: string) => {
  switch (location) {
    case 'nav':
      return navbarImgCSS;
    case 'main':
      return mainImgCSS;
    default:
      return mainImgCSS;
  }
};

const SearchTitleWrapper = styled.div`
  position: relative;
`;

const SearchTitleInput = styled.input<{ location: string }>`
  position: relative;
  background: #f7f7f7;
  box-shadow: 4px 4px 4px rgba(173, 173, 173, 0.25);
  color: var(--color-dark-grey);
  border: none;
  border-radius: 30px;
  outline: none;

  ${(props) => handleInput(props.location)}
`;

const SearchTitleImg = styled.img<{ location: string }>`
  position: absolute;
  cursor: pointer;

  ${(props) => handleImg(props.location)}
`;

function SearchTitleBox({ location }: Props) {
  return (
    <SearchTitleWrapper>
      <SearchTitleInput placeholder="제목을 검색하세요" location={location}></SearchTitleInput>
      <SearchTitleImg src={search} location={location} />
    </SearchTitleWrapper>
  );
}

export default SearchTitleBox;
