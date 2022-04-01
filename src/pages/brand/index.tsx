import styled from 'styled-components';

const BrandImg = styled.img`
  width: 100%;
`;

import Brand1 from '../../assets/images/brand/About_brand1.png';
import Brand2 from '../../assets/images/brand/About_brand2.png';
import Brand3 from '../../assets/images/brand/About_brand3.png';
import Brand4 from '../../assets/images/brand/About_brand4.png';
import Brand5 from '../../assets/images/brand/About_brand5.png';

function Brand() {
  return (
    <>
      <BrandImg src={Brand1} />
      <BrandImg src={Brand2} />
      <BrandImg src={Brand3} />
      <BrandImg src={Brand4} />
      <BrandImg src={Brand5} />
    </>
  );
}

export default Brand;
