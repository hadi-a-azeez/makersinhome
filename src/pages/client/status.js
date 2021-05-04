import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { apiRoot } from "../../config";

const StoreStatus = () => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    const getStatus = async () => {
      const response = await Axios.get(
        `${apiRoot}/client/store/status/storecount`
      );
      setStatus(response.data.count);
      console.log(response);
    };
    getStatus();
  }, []);
  return (
    <Stack width="100%" backgroundColor="#212121" h="100vh">
      <Box borderRadius="10px" backgroundColor="#fff" p="20px" m="30px">
        <Heading size="sm" fontFamily="elemen" color="gray.500">
          Store Count
        </Heading>
        <Heading size="4xl" fontFamily="elemen">
          {status ? status : "_"}
        </Heading>
      </Box>
    </Stack>
  );
};

export default StoreStatus;
