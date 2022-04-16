import React, { useEffect, useState } from "react";
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
import { useUser } from "../utils/useUser";
import { profileImagesRoot } from "../config";
import Placeholder from "../assets/person-outline.svg";
import LinkInBioIcon from "../assets/albums-outline.svg";
import LinkInBioIconFilled from "../assets/albums.svg";

const Container = styled.div`
  ${tw`w-full bg-gray-100 lg:min-h-screen sm:h-auto z-10`}
  height: 70px;
  position: fixed;
  bottom: 0;
  @media (min-width: 768px) {
    width: 300px;
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
    place-items: start;
    width: auto;
    padding: 1.5rem;
    position: relative;
    bottom: auto;
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
    grid-template-columns: 30px 1fr;
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
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
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

const ProfilePicture = styled.img`
  ${tw`bg-white rounded-full `}
  width: 40px;
  height: 40px;
`;

const NavItem = ({
  to,
  icon,
  iconFilled,
  label,
  selected,
  smHidden = false,
}) => {
  //checking the device
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  function handleWindowSizeChange() {
    if (window.innerWidth < 600) setIsMobile(true);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  //hiding navs in mobile
  if (isMobile && smHidden) return null;
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
  const { user } = useUser();
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
      to: "/app/links",
      icon: LinkInBioIcon,
      iconFilled: LinkInBioIconFilled,
      label: "Links",
      selected: pathname === "links",
    },
    {
      to: "/app/categories",
      icon: CategoriesIcon,
      iconFilled: CategoriesIconFilled,
      label: "Categories",
      selected: pathname === "categories",
      smHidden: true,
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
        <ProfilePicture
          src={
            user?.account_store_image
              ? `${profileImagesRoot}/${user.account_store_image}`
              : Placeholder
          }
          alt="profile"
        />
        <h1 className="text-base font-normal text-gray-500">
          {user?.account_store}
        </h1>
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
