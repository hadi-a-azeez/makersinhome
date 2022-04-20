import React from "react";
import tw, { styled } from "twin.macro";
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

const SellerPageLayout = ({
  children,
  label,
  isBackButton,
  rightIcon,
  className = "",
}) => {
  return (
    <Container className={className}>
      <LeftContainer>
        <Navigation />
      </LeftContainer>
      <RightContainer>
        {/* <HeaderAdmin /> */}
        <LabelHeader
          label={label}
          isBackButton={isBackButton}
          rightIcon={rightIcon}
        />
        {children}
      </RightContainer>
    </Container>
  );
};

export default SellerPageLayout;
