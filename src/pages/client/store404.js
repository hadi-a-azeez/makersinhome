import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import Cactus3D from "../../assets/cactus.png";
import Monitor3D from "../../assets/monitor_error.png";

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
      <Image
        src={Math.round(Math.random()) == 1 ? Monitor3D : Cactus3D}
        w="60%"
        mt="-60px"
      />
      <Heading fontWeight="bold" mt="20px">
        Store Dosen't Exist
      </Heading>
      <Text w="80%" color="gray.400" textAlign="center" fontWeight="normal">
        A store by this username dosent exist, please check your link.
      </Text>
      <Button
        onClick={() => history.push("/")}
        mt="20px"
        size="lg"
        w="70%"
        bgColor="#08bd80"
        textColor="#fff"
        height="60px"
      >
        Goto Homepage
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
