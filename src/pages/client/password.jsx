import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import React, { useState, useEffect } from "react";
import Header from "../../components/header";
import { apiRoot } from "../../config.js";
import CryptoJS from "crypto-js";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import date from "date-and-time";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordReset = (props) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const phoneNumber = CryptoJS.enc.Base64.parse(
    props.match.params.phone_number
  ).toString(CryptoJS.enc.Utf8);
  useEffect(() => {
    const dateHashed = props.match.params.key;
    const todaysDate = new Date();
    const pattern = date.compile("MMM DD YYYY");
    const formattedDate = date.format(todaysDate, pattern);

    const dateEncrypted = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(formattedDate)
    );
    dateHashed !== dateEncrypted && setIsValid(false);
  }, []);

  const changePassword = async () => {
    setIsLoading(true);
    const response = await Axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        phone: phoneNumber,
        password: password,
      },
      url: `${apiRoot}/seller/login/password-reset`,
    });
    console.log(response);
    history.push("/login");
  };

  return (
    <Stack w="100%" direction="column">
      <Header />
      {isValid ? (
        <Stack direction="column" alignItems="center">
          <Heading size="xl" mt="40px" fontFamily="elemen">
            Reset Password
          </Heading>
          <Box w="90%" mb="10px">
            <FormLabel mt="20px" fontFamily="elemen" color="gray.500">
              New Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="••••••••••••"
                type={showPassword ? "text" : "password"}
                size="lg"
                name="password"
                value={password}
                variant="filled"
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <InputRightElement height="100%" mr="5px">
                  <Stack
                    h="100%"
                    direction="column"
                    justifyContent="center"
                    onClick={() => setShowPassword((old) => !old)}
                  >
                    {showPassword ? (
                      <ViewOffIcon boxSize="20px" />
                    ) : (
                      <ViewIcon boxSize="20px" />
                    )}
                  </Stack>
                </InputRightElement>
              )}
            </InputGroup>
          </Box>
          <Button
            isDisabled={password.length < 6}
            fontFamily="elemen"
            backgroundColor="#08bd80"
            color="white"
            colorScheme="green"
            w="90%"
            h="60px"
            size="lg"
            isLoading={isLoading}
            mb="80px"
            onClick={changePassword}
          >
            Change Password
          </Button>
        </Stack>
      ) : (
        <p>Link Expired Please Request New One</p>
      )}
    </Stack>
  );
};

export default PasswordReset;
