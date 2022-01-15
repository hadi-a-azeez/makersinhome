import React from "react";
import tw, { styled } from "twin.macro";
import HeaderAdmin from "../../../components/HeaderAdmin";
import Navigation from "../../../components/Navigation";

const Container = styled.div`
  ${tw`flex-1 grid`}
  min-width: 100vw;
  min-height: 100vh;
  @media (min-width: 768px) {
    grid-template-columns: 200px 3fr;
  }
`;
const LeftContainer = tw.div``;

const RightContainer = tw.div`relative h-full flex flex-col justify-center items-center`;

const DashboardPageLayout = (props) => {
  const { children } = props || {};

  return (
    <Container>
      <LeftContainer>
        <Navigation />
      </LeftContainer>
      <RightContainer>
        <HeaderAdmin />
        {children}
      </RightContainer>
    </Container>
  );
};

export default DashboardPageLayout;
