import React from "react";
import tw, { styled } from "twin.macro";
import { useHeader } from "@/utils/useHeader";
import LabelHeader from "../../components/labelHeader";
import Navigation from "../../components/Navigation";

const Container = styled.div`
  ${tw`flex-1 grid`}
  min-width: 100vw;
  min-height: 100vh;
  @media (min-width: 768px) {
    grid-template-columns: 300px 3fr;
  }
`;
const LeftContainer = styled.div``;

const RightContainer = styled.div`
  ${tw`relative h-full flex flex-col justify-center items-center`}
`;

const SellerPageLayout = ({ children }) => {
  const {
    header: { title = "", isBackButton = false, rightIcon = null },
  } = useHeader();

  return (
    <Container>
      <LeftContainer>
        <Navigation />
      </LeftContainer>
      <RightContainer>
        <LabelHeader
          label={title}
          isBackButton={isBackButton}
          rightIcon={rightIcon}
        />
        {children}
      </RightContainer>
    </Container>
  );
};

export default SellerPageLayout;
