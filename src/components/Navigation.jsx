import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import tw, { styled } from "twin.macro";
import SaavLogoSVG from "assets/ssav_logo.png";
import LinkInBioIcon from "assets/albums-outline.svg";
import LinkInBioIconFilled from "assets/albums.svg";
import CategoriesIcon from "assets/grid-outline.svg";
import CategoriesIconFilled from "assets/gridFilled.svg";
import HomeIcon from "assets/home-outline.svg";
import HomeIconFilled from "assets/homeFilled.svg";
import ProductsIcon from "assets/layers-outline.svg";
import ProductsIconFilled from "assets/layersFilled.svg";
import Placeholder from "assets/person-outline.svg";
import SettingsIcon from "assets/settings-outline.svg";
import SettingsIconFilled from "assets/settings.svg";
import { profileImagesRoot } from "../config";
import { useUser } from "utils/hooks/useUser";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  ${tw`w-full bg-white lg:min-h-screen sm:h-auto z-10 border-t `}
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
    background: #f7f7f7e4;
    /* border-right: 1.5px solid #d4d4d4; */
    box-shadow: rgba(224, 224, 224, 0.2) -10px 0px 24px inset;
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
    position: relative;
    bottom: auto;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    height: 100%;
    gap: 5px;
  }
`;

const Item = styled.div`
  ${tw`flex flex-col justify-center items-center h-full gap-1`}
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 30px 1fr;
    gap: 1rem;
    width: 250px;
    padding: 1rem;
    :hover {
      background-color: #ebebeb;
      border-radius: 10px;
    }
  }
`;

const IconContainer = styled.div`
  width: 27px;
  height: 27px;
  position: relative;
  @media (min-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Icon = styled.img`
  width: 27px;
  height: 27px;
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
  ${tw`lg:text-base sm:text-xs font-normal text-gray-500`}
  font-size: 12px;
  ${({ selected }) => selected && tw`text-primary font-semibold`}
  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

const ProfileContainer = styled.div`
  ${tw`w-full flex flex-row  items-center pl-12  pb-10 gap-3 hidden`}
  @media (min-width: 768px) {
    display: flex;
  }
  img {
    ${tw`bg-white rounded-full `}
    width: 40px;
    height: 40px;
  }
  h1 {
    ${tw`font-medium`}
  }
`;

const SaavLogo = styled.div`
  cursor: pointer;
  margin-left: 3rem;
  padding-bottom: 3rem;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  img {
    height: auto;
    width: 35px;
  }
  h2 {
    padding-left: 8px;
    font-size: 28px;
    font-weight: 500;
  }
  @media (max-width: 768px) {
    display: none;
  }
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
      <Item selected={selected}>
        <Icon src={selected ? iconFilled : icon} selected={selected} />
        <Text selected={selected}>{label}</Text>
      </Item>
    </Link>
  );
};

const Navigation = () => {
  const { user } = useUser();
  const pathname = useLocation().pathname.split("/")[2];
  const history = useHistory();
  const navItems = [
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
      smHidden: true,
    },
    {
      to: "/app/links",
      icon: LinkInBioIcon,
      iconFilled: LinkInBioIconFilled,
      label: "Links",
      selected: pathname === "links",
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
      <SaavLogo onClick={() => history.push("/app/dashboard")}>
        <img src={SaavLogoSVG} />
        <h2>Saav</h2>
      </SaavLogo>
      <NavContainer>
        {navItems.map((item) => (
          <NavItem {...item} key={item.to} />
        ))}
      </NavContainer>
      <ProfileContainer>
        <img
          src={
            user?.account_store_image
              ? `${profileImagesRoot}/${user.account_store_image}`
              : Placeholder
          }
          alt="profile"
        />
        <h1>{user?.account_store}</h1>
      </ProfileContainer>
    </Container>
  );
};

export default Navigation;
