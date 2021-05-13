import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { apiRoot } from "../../config";

const StoreStatus = () => {
  const [status, setStatus] = useState(0);
  const [names, setNames] = useState("");
  useEffect(() => {
    const getStatus = async () => {
      const response = await Axios.get(
        `${apiRoot}/client/store/status/storecount`
      );
      setNames(response.data.names);
      setStatus(response.data.count);
      console.log(response);
    };
    getStatus();
  }, []);
  return (
    <Stack width="100%" backgroundColor="#212121" h="100vh" p="30px">
      <Box borderRadius="10px" backgroundColor="#fff" p="20px">
        <Heading size="sm" fontFamily="elemen" color="gray.500">
          Store Count
        </Heading>
        <Heading size="4xl" fontFamily="elemen">
          {status ? status : "_"}
        </Heading>
      </Box>
      <Box borderRadius="10px" backgroundColor="#fff" p="20px">
        <Heading size="sm" fontFamily="elemen" color="gray.500">
          Latest Users
        </Heading>
        {names &&
          names.map((name) => (
            <Text size="md" fontFamily="elemen" key={name.id}>
              {name.account_store}
            </Text>
          ))}
      </Box>
    </Stack>
  );
};

export default StoreStatus;
