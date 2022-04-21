import React from "react";
import tw, { styled } from "twin.macro";
import Header from "../../../components/header";
import AddToCart from "../../../assets/addtocart.svg";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  ${tw`flex flex-col`}
  min-width: 100vw;
  min-height: 100vh;
`;
const ContentContainer = tw.div`flex-1 grid lg:grid-cols-authContainer`;

const LeftContainer = tw.div`hidden px-4 lg:grid place-items-center h-full `;
const LeftImage = styled.img`
  width: 70%;
  height: auto;
`;
const RightContainer = tw.div`relative h-full flex flex-col justify-center items-center`;

const AuthPageLayout = (props) => {
  const { children } = props || {};
  let pathName = useLocation().pathname;

  return (
    <Container>
      <Header signup={pathName === "/signup" ? false : true} />
      <ContentContainer>
        <LeftContainer>
          <LeftImage src={AddToCart} />
        </LeftContainer>
        <RightContainer>{children}</RightContainer>
      </ContentContainer>
    </Container>
  );
};

export default AuthPageLayout;
