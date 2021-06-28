import {
  Heading,
  Image,
  Stack,
  Text,
  Badge,
  IconButton,
  Box,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UilShareAlt, UilPhone, UilWhatsapp } from "@iconscout/react-unicons";

import LabelHeader from "../../../components/labelHeader";

const ProductCard = () => {
  return (
    <Stack direction="row" mb="10px">
      <Image src="https://cutt.ly/ymtdT4A" w="82px" borderRadius="6px" />
      <Stack
        w="100%"
        spacing="0"
        direction="column"
        justifyContent="center"
        ml="5px"
      >
        <Text fontSize="16px">Red Wine Soap</Text>
        <Text fontSize="13px" fontWeight="medium" color="#8f8f8f">
          Count: 2
        </Text>
        <Text fontSize="13px" fontWeight="medium" color="#8f8f8f">
          Variant: Red
        </Text>
        <Stack w="100%" direction="row" justifyContent="space-between">
          <Stack direction="row">
            <Badge
              pl="8px"
              pr="8px"
              alignSelf="center"
              variant="solid"
              backgroundColor="#08bd80"
              fontSize="14px"
              fontWeight="bold"
              colorScheme="green"
            >
              2
            </Badge>
            <Text>x ₹1200</Text>
          </Stack>
          <Text fontWeight="medium" color="gray.600">
            ₹2400
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
};

const OrderDetailed = () => {
  return (
    <>
      <LabelHeader label={"Order #37673HD"} isBackButton={true} />
      <Stack direction="column" p="20px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <span
              style={{
                width: "13px",
                height: "13px",
                borderRadius: "50%",
                display: "inline-block",
                backgroundColor: "gray",
              }}
            ></span>
            <Text>Recieved</Text>
          </Stack>
          <Text fontSize="13px" color="#a1a1a1">
            Today, 08:26 AM
          </Text>
        </Stack>
        <Text fontWeight="medium" fontSize="20px">
          Products
        </Text>
        <ProductCard />
        <ProductCard />
        <hr
          style={{
            height: "0.6px",
            background: "#dadada",
            marginBottom: "3px",
          }}
        />
        <Stack direction="row" justifyContent="space-between">
          <Text>Product Total</Text>
          <Text color="gray.600">₹4800</Text>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Text>Delivery Charge</Text>
          <Text color="gray.600">₹40</Text>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Text fontWeight="medium">Grant Total</Text>
          <Text fontWeight="medium">₹4840</Text>
        </Stack>
        <hr
          style={{
            height: "0.6px",
            background: "#dadada",
            marginBottom: "3px",
          }}
        />
        <Text fontWeight="medium" fontSize="20px">
          Customer Details
        </Text>
        <Stack direction="column" spacing="0">
          <Text fontWeight="medium">Naz</Text>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing="0"
          >
            <Text color="grey">+919496742190</Text>
            <Stack direction="row">
              <IconButton
                mr="10px"
                icon={<UilPhone size="20" />}
                borderRadius="full"
              />
              <IconButton
                icon={<UilWhatsapp size="20" color="white" />}
                borderRadius="full"
                backgroundColor="green.500"
              />
            </Stack>
          </Stack>
          <Text fontWeight="medium" color="gray">
            Address
          </Text>
          <Text color="grey" w="80%" mb="6px">
            Poovatham poyil (h) vavad, PO koduvally , kozhikode
          </Text>
          <Stack direction="row">
            <Box mr="50px">
              <Text fontWeight="medium" color="gray">
                City
              </Text>
              <Text color="grey">Koduvally</Text>
            </Box>
            <Box>
              <Text fontWeight="medium" color="gray">
                Pincode
              </Text>
              <Text color="grey">673572</Text>
            </Box>
          </Stack>
        </Stack>
        <Stack direction="row" W="100%" pt="20px">
          <Button width="30%" h="50px">
            Cancel
          </Button>
          <Button width="70%" backgroundColor="#08bd80" h="50px" color="white">
            Accept Order
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default OrderDetailed;
