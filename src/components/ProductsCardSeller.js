import React from "react";
import tw, { styled } from "twin.macro";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";

const Card = styled.div`
  ${tw`w-full grid bg-white rounded-lg shadow-lg p-4 gap-2 cursor-pointer`}
  height: auto;
  grid-template-columns: 100px 1fr;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col gap-2`}
`;

const Title = styled.h3`
  ${tw`text-sm font-normal text-gray-800`}
`;

const Price = styled.h3`
  ${tw`text-xl font-semibold text-gray-800`}
`;

const BottomContainer = styled.div`
  ${tw`flex flex-row justify-between`}
`;

const StockText = styled.h3`
  ${tw`text-sm font-normal text-primary`}
  ${(stock) => (stock ? tw`text-primary` : tw`text-red-500`)}
`;

const ProductCard = ({ title, image, stock, price, id, onStockToggle }) => {
  const history = useHistory();
  return (
    <Card key={id} onClick={() => history.push(`/app/product_edit/${id}`)}>
      <Image src={image} alt="product" />
      <ContentContainer>
        <Title>{title}</Title>
        <Price>{price}</Price>
        <BottomContainer>
          <StockText stock={stock}>
            {stock ? "In Stock" : "Out Of Stock"}
          </StockText>
          <Switch
            onChange={onStockToggle}
            checked={stock ? true : false}
            onColor="#00b140"
            width={36}
            height={21}
            id={id}
          />
        </BottomContainer>
      </ContentContainer>
    </Card>
  );
};

export default ProductCard;
