import { Box, Heading, Stack, Text, IconButton } from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiRoot } from "../../config";
import CoinIcon from "../../assets/coinicon.png";
import Whatsapp from "../../assets/whatsapp_filled.svg";
import { ArrowForwardIcon, EmailIcon } from "@chakra-ui/icons";

const StoreStatus = () => {
  const history = useHistory();
  const [status, setStatus] = useState(0);
  const [names, setNames] = useState("");
  const [viewsData, setViewsData] = useState();

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
    const getViews = async () => {
      const response = await Axios.get(`${apiRoot}/client/store/status/views`);
      setViewsData(response.data);
    };
    getViews();
    getStatus();
  }, []);
  return (
    <Stack width="100%" backgroundColor="#212121" h="100%" p="30px">
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
            <Stack direction="row" w="100%">
              <Text
                size="md"
                fontFamily="elemen"
                key={name.id}
                onClick={() =>
                  history.push(`/store/${name.account_store_link}`)
                }
              >
                {name.account_store}
              </Text>

              <EmailIcon
                boxSize="20px"
                marginLeft="120px"
                onClick={() =>
                  window.location.replace(
                    `https://api.whatsapp.com/send?phone=91${name.account_whatsapp}&text=Thanks%20for%20Joining%20Saav%20%F0%9F%98%8D.%0AIf%20you%20have%20any%20doubts%20feel%20free%20to%20message%20us%20%F0%9F%91%8D`
                  )
                }
              />
            </Stack>
          ))}
      </Box>
      <Box borderRadius="10px" backgroundColor="#fff" p="20px">
        <Heading size="sm" fontFamily="elemen" color="gray.500">
          Total Views
        </Heading>
        <Heading size="4xl" fontFamily="elemen">
          {viewsData ? viewsData.total_views : "_"}
        </Heading>
        <Heading size="md" color="gray.600">
          Clicks: {viewsData ? viewsData.total_clicks : "_"}
        </Heading>
      </Box>
      <Box borderRadius="10px" backgroundColor="#fff" p="20px">
        <Heading size="sm" fontFamily="elemen" color="gray.500">
          Top Users
        </Heading>
        {viewsData?.stores.slice(0, 10).map((name) => (
          <Stack direction="row" w="100%">
            <Text
              size="md"
              fontFamily="elemen"
              key={name.id}
              onClick={() =>
                history.push(`/store/${name.account.account_store_link}`)
              }
            >
              {name?.user?.account_store}
            </Text>

            <Text>{name.store_views}</Text>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
};

export default StoreStatus;
