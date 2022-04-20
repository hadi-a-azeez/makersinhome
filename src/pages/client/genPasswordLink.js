import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import CryptoJS from "crypto-js";
import date from "date-and-time";
import React, { useState } from "react";
import copyText from "../../utils/copyText";
import Header from "../../components/header";

const GenPassWordLink = () => {
  const [phone, setPhone] = useState();
  const [link, setLink] = useState();

  const todaysDate = new Date();
  const pattern = date.compile("MMM DD YYYY");
  const formattedDate = date.format(todaysDate, pattern);

  const dateEncrypted = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(formattedDate)
  );

  return (
    <Stack w="100%" direction="column">
      <Header />
      <Stack direction="column" alignItems="center">
        <Heading size="xl" mt="40px" fontFamily="elemen">
          Generate Password Link
        </Heading>
        <Box w="90%" mb="10px">
          <FormLabel mt="20px" fontFamily="elemen" color="gray.500">
            Phone Number
          </FormLabel>
          <Input
            type="text"
            name="password"
            defaultValue={phone}
            variant="filled"
            size="lg"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Box>
        <Button
          fontFamily="elemen"
          backgroundColor="#08bd80"
          color="white"
          colorScheme="green"
          w="90%"
          h="60px"
          size="lg"
          mb="5px"
          onClick={() =>
            setLink(
              `https://app.saav.in/password/${CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(phone)
              )}/${dateEncrypted}`
            )
          }
        >
          Generate Link
        </Button>
        {link && (
          <>
            <Button
              fontFamily="elemen"
              backgroundColor="#ff3333"
              color="white"
              colorScheme="green"
              w="90%"
              h="60px"
              size="lg"
              mb="40px"
              onClick={() => copyText(link)}
            >
              Copy Link
            </Button>

            <Input
              type="text"
              w="80%"
              mt="20px"
              value={link}
              variant="filled"
              size="lg"
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};
export default GenPassWordLink;
