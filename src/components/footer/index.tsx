import styled from 'styled-components';

const FooterBox = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 10;
  background-color: #fff;
`;

const FooterSpan = styled.span`
  font-size: var(--font-size-small);
  margin-right: 20px;
`;

function Footer() {
  return (
    <FooterBox>
      <FooterSpan>문의사항: whereismyteamcontact@gmail.com</FooterSpan>
    </FooterBox>
  );
}

export default Footer;
