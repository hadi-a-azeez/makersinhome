import React from "react";
import { Link, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";
import HomeIcon from "../assets/home-outline.svg";
import HomeIconFilled from "../assets/homeFilled.svg";
import ProductsIcon from "../assets/layers-outline.svg";
import ProductsIconFilled from "../assets/layersFilled.svg";
import CategoriesIcon from "../assets/grid-outline.svg";
import CategoriesIconFilled from "../assets/gridFilled.svg";
import SettingsIcon from "../assets/settings-outline.svg";
import SettingsIconFilled from "../assets/settings.svg";

const Container = styled.div`
  ${tw`w-full bg-gray-100 lg:min-h-screen sm:h-auto z-10`}
  height: 70px;
  position: fixed;
  bottom: 0;
  @media (min-width: 768px) {
    position: relative;
    bottom: auto;
    max-height: 100vh;
    position: fixed;
    left: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

const NavContainer = styled.div`
  ${tw` w-full grid place-items-center`}
  height: 70px;
  grid-template-columns: repeat(4, 1fr);
  position: fixed;
  bottom: 0;
  @media (min-width: 768px) {
    padding: 1.5rem;
    position: relative;
    bottom: auto;
    max-height: 100vh;
    position: fixed;
    left: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    height: 100%;
  }
`;

const Item = styled.div`
  ${tw`flex flex-col justify-center items-center h-full gap-2`}
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 20px 1fr;
    gap: 1rem;
  }
`;

const Icon = styled.img`
  width: 22px;
  height: 22px;
  filter: invert(14%) sepia(49%) saturate(0%) hue-rotate(236deg) brightness(91%)
    contrast(94%);
  ${({ selected }) =>
    selected &&
    `filter: invert(50%) sepia(100%) saturate(746%) hue-rotate(117deg)
    brightness(90%) contrast(94%);`}
`;

const Text = styled.h1`
  ${tw`text-base font-normal text-gray-500`}
  ${({ selected }) => selected && tw`text-primary font-bold`}
`;

const ProfileContainer = styled.div`
  ${tw`w-full flex flex-row  items-center p-4 gap-3 hidden`}
  @media (min-width: 768px) {
    display: flex;
  }
`;

const ProfilePicture = styled.div`
  ${tw`bg-white rounded-full shadow-lg`}
  width: 40px;
  height: 40px;
`;

const NavItem = ({ to, icon, iconFilled, label, selected }) => {
  return (
    <Link to={to}>
      <Item>
        <Icon src={selected ? iconFilled : icon} selected={selected} />
        <Text selected={selected}>{label}</Text>
      </Item>
    </Link>
  );
};

const Navigation = () => {
  const pathname = useLocation().pathname.split("/")[2];
  const nav = [
    {
      to: "/app/dashboard",
      icon: HomeIcon,
      iconFilled: HomeIconFilled,
      label: "Home",
      selected: pathname === "dashboard",
    },
    {
      to: "/app/products",
      icon: ProductsIcon,
      iconFilled: ProductsIconFilled,
      label: "Products",
      selected: pathname === "products",
    },
    {
      to: "/app/categories",
      icon: CategoriesIcon,
      iconFilled: CategoriesIconFilled,
      label: "Categories",
      selected: pathname === "categories",
    },
    {
      to: "/app/settings",
      icon: SettingsIcon,
      iconFilled: SettingsIconFilled,
      label: "Settings",
      selected: pathname === "settings",
    },
  ];

  return (
    <Container>
      <ProfileContainer>
        <ProfilePicture></ProfilePicture>
        <h1 className="font-sm font-semibold text-gray-400">User name</h1>
      </ProfileContainer>
      <NavContainer>
        {nav.map((item) => (
          <NavItem {...item} />
        ))}
      </NavContainer>
    </Container>
  );
};

export default Navigation;
