import FocusLock from "@chakra-ui/focus-lock";
import { NotAllowedIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import tw, { styled } from "twin.macro";

// const Card = styled.div`
//   ${tw`w-full grid bg-gray-100 rounded-lg p-4 gap-2 cursor-pointer`}
//   height: auto;
//   grid-template-columns: 100px 1fr;
// `;

const Image = styled.img`
  ${tw`h-24 w-24 rounded-md`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col gap-2 relative`}
`;

const Title = styled.h3`
  ${tw`text-sm font-normal text-gray-800 capitalize`}
`;

const Price = styled.h3`
  ${tw`text-xl font-semibold text-gray-800`}
`;

const BottomContainer = styled.div`
  ${tw` absolute bottom-0 absolute m-auto left-0 right-0 flex flex-row justify-between`}
`;

const StockText = styled.h3`
  ${tw`text-sm font-normal text-primary`}
  ${({ stock, inventory_count }) =>
    !stock
      ? tw`text-red-500`
      : inventory_count < 1
      ? tw`text-red-500`
      : tw`text-green-500`}
`;

const ProductCard = ({
  title,
  image,
  stock,
  inventory_count,
  price,
  id,
  onStockToggle,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  return (
    <Link key={id} to={`/app/product_edit/${id}`} className="product-card">
      <Image src={image} alt="product" />
      <ContentContainer>
        <Title>{title}</Title>
        <Price>{price}</Price>
        <BottomContainer>
          <StockText stock={stock} inventory_count={inventory_count}>
            {!stock
              ? "Hidden"
              : inventory_count < 1
              ? "Out Of Stock"
              : `In stock: ${inventory_count}`}
          </StockText>
          {/* chakra ui switch has many errors */}
          <Switch
            isChecked={stock && inventory_count > 0}
            colorScheme="green"
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              if (stock && inventory_count > 0) onOpen();
              else if (inventory_count < 1) {
                toast({
                  title: "Update stock in product details",
                  status: "warning",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
                });
              } else if (!stock) onStockToggle(stock, "visible", id);
            }}
          />
          <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
            <FocusLock />
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select Type</ModalHeader>
              <Stack direction="column" pl="15px" pr="15px" pb="15px">
                <Button
                  leftIcon={<ViewOffIcon />}
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    onStockToggle(stock, "visible", id);
                    onClose();
                  }}
                >
                  Hide
                </Button>
                <Button
                  leftIcon={<NotAllowedIcon />}
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    onStockToggle(stock, "stock", id);
                    onClose();
                  }}
                >
                  Out of stock
                </Button>
              </Stack>
              <ModalCloseButton />
            </ModalContent>
          </Modal>
        </BottomContainer>
      </ContentContainer>
    </Link>
  );
};

export default ProductCard;
