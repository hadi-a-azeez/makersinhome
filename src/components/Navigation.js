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
  ${tw`z-10 w-full grid bg-gray-900`}
  height: 80px;
  grid-template-columns: repeat(4, 1fr);
  position: fixed;
  bottom: 0;
  @media (min-width: 768px) {
    padding: 1.5rem;
    position: relative;
    bottom: auto;
    width: 100%;
    max-height: 100vh;
    position: fixed;
    left: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    height: 100%;
  }
`;

const Item = styled.div`
  ${tw`flex flex-col justify-center items-center h-full gap-2`}
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 20px 1fr;
  }
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
  filter: invert(25%) sepia(9%) saturate(20%) hue-rotate(316deg) brightness(93%)
    contrast(90%);
  ${({ selected }) =>
    selected &&
    `filter: invert(50%) sepia(100%) saturate(746%) hue-rotate(117deg)
    brightness(90%) contrast(94%);`}
`;

const Text = styled.h1`
  ${tw`text-base font-normal text-white`}
  ${({ selected }) => selected && tw`text-primary font-bold`}
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
      {nav.map((item) => (
        <NavItem {...item} />
      ))}
    </Container>
  );
};

export default Navigation;
