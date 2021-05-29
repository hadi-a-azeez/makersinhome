import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import Store3D from "../../assets/store_3d.png";
import SaavIcon from "../../assets/saav_complete_logo.png";
import { Stack } from "@chakra-ui/layout";
import { useHistory } from "react-router-dom";

const StoreShut = ({ storeData }) => {
  const history = useHistory();

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#f8f9fd"
      fontFamily="elemen"
    >
      <Image src={Store3D} w="80%" mt="-60px" />
      <Heading fontWeight="bold">Store is Closed</Heading>
      <Text w="80%" color="gray.400" textAlign="center" fontWeight="normal">
        This store isnt recieving order currently. Please revisit or contact
        store Owner.
      </Text>
      <Button
        onClick={() =>
          window.location.replace(
            `https://api.whatsapp.com/send?phone=+91${storeData.account_whatsapp}&text=Hi%20I%20came%20from%20your%20store%20%E2%9C%8B`
          )
        }
        mt="20px"
        size="lg"
        w="70%"
        bgColor="#08bd80"
        textColor="#fff"
        height="60px"
      >
        Message Owner
      </Button>
      <Box
        mt="60px"
        h="40px"
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Text mr="10px" mt="5px">
          Powered by{" "}
        </Text>
        <Image w="80px" src={SaavIcon} onClick={() => history.push("/")} />
      </Box>
    </Box>
  );
};

export default StoreShut;
