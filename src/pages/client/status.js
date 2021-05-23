import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiRoot } from "../../config";
import CoinIcon from "../../assets/coinicon.png";

const StoreStatus = () => {
  const history = useHistory();
  const [status, setStatus] = useState(0);
  const [names, setNames] = useState("");

  const genesisDate = new Date("05/16/2021");
  const todaysDate = new Date();

  const diffTime = Math.abs(todaysDate - genesisDate);
  //coins supply 2 per day
  const coinsCount = diffTime / 60000 / 720;

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
      <Box
        background={`linear-gradient(315deg, #fec84e 0%, #ffdea8 74%)`}
        borderRadius="10px"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        border="3px solid white"
      >
        <Box
          backgroundImage={`url(${CoinIcon})`}
          backgroundSize="150px"
          backgroundPosition="175px 30px"
          backgroundRepeat="no-repeat"
          p="20px"
        >
          <Heading size="sm" mb="5px" fontFamily="elemen" color="gray.600">
            SAAV Coin
          </Heading>
          <Heading size="4xl" fontFamily="elemen">
            {status ? `₹${(status / coinsCount).toFixed(2)}` : "_"}
          </Heading>
          <Text
            size="sm"
            fontFamily="elemen"
            color="black.400"
            fontStyle="bold"
          >
            Supply: {coinsCount.toFixed(3)}
          </Text>
        </Box>
      </Box>
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
            <Text
              size="md"
              fontFamily="elemen"
              key={name.id}
              onClick={() => history.push(`/store/${name.account_store_link}`)}
            >
              {name.account_store}
            </Text>
          ))}
      </Box>
    </Stack>
  );
};

export default StoreStatus;
