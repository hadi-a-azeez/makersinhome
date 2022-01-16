import React from "react";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  ${tw`z-10 grid bg-white flex flex-row justify-between items-center p-4`}
  height: 80px;
  width: 100%;
`;

const LeftContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-full gap-2`}
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 20px 1fr;
  }
`;

const RightContainer = styled.div`
  ${tw`relative h-full flex flex-col justify-center items-center`}
`;

const Image = styled.div`
  ${tw`bg-gray-200 rounded-full`}
  width: 30px;
  height: 30px;
`;
const Image2 = styled.div`
  ${tw`bg-gray-200 rounded-full`}
  width: 20px;
  height: 20px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderAdmin = () => {
  return (
    <Container>
      <LeftContainer>
        <Image2></Image2>
        Dashboard
      </LeftContainer>
      <RightContainer>
        <Image></Image>
      </RightContainer>
    </Container>
  );
};

export default HeaderAdmin;
