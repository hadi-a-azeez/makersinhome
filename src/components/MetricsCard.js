import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import styles from "../pages/seller/css/dashboard.module.css";

const MetricsCard = ({ title, value, icon, link }) => {
  const history = useHistory();
  return (
    <Box
      onClick={() => history.push(link)}
      height="100px"
      w="100%"
      shadow="md"
      backgroundColor="white"
      borderRadius="18px"
      display="flex"
      dir="row"
    >
      <Image
        src={icon}
        className={styles.iconFilled}
        width="7"
        height="5"
        mt="4"
        ml="3"
      />
      <Flex direction="column" mt="4" ml="1">
        <h1 className={styles.card_heading}>{title}</h1>
        <h1 className={styles.card_data_bold}>{value}</h1>
      </Flex>
    </Box>
  );
};

export default MetricsCard;
