import styled from 'styled-components';

const SkeletonWrapper = styled.div`
  padding-top: 36px;
  margin: 21px 14.5px;
`;

const SkeletonBox = styled.div`
  position: relative;
  width: 228px;
  height: 219px;
  background: rgba(165, 165, 165, 0.11);
  display: flex;
  border-radius: 10px;
`;

const SkeletonLeftBar = styled.div`
  width: 55px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @-webkit-keyframes skeleton-gradient {
    0% {
      background-color: rgba(221, 221, 221, 0.3);
    }

    50% {
      background-color: rgba(221, 221, 221, 0.5);
    }

    100% {
      background-color: rgba(221, 221, 221, 0.3);
    }
  }

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(221, 221, 221, 0.3);
    }

    50% {
      background-color: rgba(221, 221, 221, 0.5);
    }

    100% {
      background-color: rgba(221, 221, 221, 0.3);
    }
  }
  -webkit-animation: skeleton-gradient 1.8s infinite ease-in-out;
  animation: skeleton-gradient 1.8s infinite ease-in-out;
`;

const SkeletonContent = styled.div`
  width: 173px;
`;

const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonBox>
        <SkeletonLeftBar />
        <SkeletonContent />
      </SkeletonBox>
    </SkeletonWrapper>
  );
};

function Skeletons() {
  return (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </>
  );
}

export default Skeletons;
