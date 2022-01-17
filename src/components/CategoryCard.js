import React from "react";
import tw, { styled } from "twin.macro";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import Ellipse from "../assets/ellipse_outline.svg";

const Card = styled.div`
  ${tw`w-full grid bg-white rounded-lg shadow-lg p-4 gap-2`}
  height: auto;
  grid-template-columns: 1fr 30px;
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const Title = styled.h3`
  ${tw`text-lg font-normal text-gray-800`}
`;

const CountText = styled.h3`
  ${tw`text-sm font-normal text-gray-700`}
`;

const CategoryCard = ({ category, count }) => {
  return (
    <Card key={category}>
      <ContentContainer>
        <Title>{category}</Title>
        <CountText>{count}</CountText>
      </ContentContainer>
      <Menu>
        <MenuButton
          position="absolute"
          top="3"
          right="3"
          bg="white"
          as={Button}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img
            src={Ellipse}
            alt="w"
            style={{
              width: "22px",
              height: "22px",
              alignSelf: "center",
            }}
          />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={(e) => {
              //   e.stopPropagation();
              //   history.push(`/app/edit_category/${item.id}`);
            }}
          >
            Edit Category
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              //   e.stopPropagation();
              //   if (navigator.share) {
              //     navigator.share({
              //       title: item.cat_name,
              //       url: `https://saav.in/store/${userInfo.account_store_link}/${item.id}`,
              //     });
              //   }
            }}
          >
            Share Category
          </MenuItem>
          <MenuItem
            color="tomato"
            onClick={(e) => {
              //   e.stopPropagation();
              //   setIsOpen(true);
              //   setCategoryDeleteId(item.id);
            }}
          >
            Delete Category
          </MenuItem>
        </MenuList>
      </Menu>
    </Card>
  );
};

export default CategoryCard;
