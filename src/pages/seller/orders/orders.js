import React, { useState, useEffect } from "react";
import styles from "../css/orders.module.css";
import { useHistory } from "react-router-dom";
import BottomNavigationMenu from "../../../components/bottomNavigation";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../../../components/labelHeader";

import {
  Box,
  StatNumber,
  Stat,
  Button,
  Skeleton,
  Stack,
  Image,
  Text,
  Badge,
} from "@chakra-ui/react";

const Orders = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const OrderCard = () => {
    return (
      <Stack
        onClick={() => history.push("/app/order_detailed")}
        backgroundColor="white"
        borderRadius="10px"
        w="90%"
        p="14px"
        marginBottom="10px"
      >
        <Stack direction="row" justifyContent="space-between">
          <Text fontSize="15px" fontWeight="bold">
            Order #DHDFH3564
          </Text>
          <Text fontSize="13px" color="#a1a1a1">
            Today, 08:26 AM
          </Text>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Image borderRadius="5px" src="https://cutt.ly/ymtdT4A" w="60px" />
          <Stack direction="column" spacing="0px">
            <Text color="grey">2 Products</Text>
            <Text fontWeight="bold" color="#08bd80">
              ₹899
            </Text>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <span
              className={styles.order_status_block}
              style={{ backgroundColor: "grey" }}
            ></span>
            <Text>Recieved</Text>
          </Stack>
          <Badge alignSelf="center" fontSize="15px">
            COD
          </Badge>
        </Stack>
      </Stack>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label="Orders" />
        {isLoading && (
          <>
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
            <Skeleton height="100px" w="90%" mt="3" borderRadius="9" />
          </>
        )}

        <Stack
          mt="20px"
          w="100%"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <OrderCard />
          <OrderCard />
        </Stack>
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Orders;
