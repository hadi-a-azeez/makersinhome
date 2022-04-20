import React, { useState } from "react";
import styles from "../css/signup.module.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Stack,
  InputRightElement,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useForm } from "../../components/useForm";
import { apiRoot } from "../../config";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthPageLayout from "../../layouts/Auth/Login";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col gap-3`}
  width: 90%;
`;
const HeadingContainer = tw.div`w-full flex justify-center items-center`;

const SignUp = () => {
  const [register, setRegister, updateRegister] = useForm({
    account_phone: "",
    account_store: "",
    account_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSignUpClick = async () => {
    let isValidate = validation();
    if (isValidate) {
      setIsLoading(true);
      const registerResponse = await axios.post(
        `${apiRoot}/seller/register/`,
        register
      );

      if (!registerResponse.data.status) {
        setErrorMessage("Already Registered, Please Login");
        setIsLoading(false);
      } else {
        setErrorMessage("");
        history.push("/login");
      }
    }
  };

  const validation = () => {
    if (register.account_phone.length !== 10) {
      setErrorMessage("Enter valid phone number");
      return false;
    }

    if (register.account_store.length < 1) {
      setErrorMessage("Enter store name");
      return false;
    }
    if (register.account_password.length < 6) {
      setErrorMessage("Password minimum length is 6");
      return false;
    }
    return true;
  };

  return (
    <AuthPageLayout>
      <Container>
        <HeadingContainer>
          <h1 className={styles.heading_normal}>Create your own</h1>
          <h1 className={styles.heading_bold}>&nbsp;FREE</h1>
          <h1 className={styles.heading_normal}>&nbsp;store.</h1>
        </HeadingContainer>
        {errorMessage.length > 1 && (
          <Box borderRadius="md" bg="tomato" color="white" p="3" w="100%">
            <h1>{errorMessage}</h1>
          </Box>
        )}

        <FormControl w="100%">
          <FormLabel color="gray.500" fontWeight="400">
            Mobile No
          </FormLabel>
          <InputGroup size="lg">
            <InputLeftAddon children="🇮🇳 +91" />
            <Input
              type="number"
              size="lg"
              placeholder="Phone number"
              name="account_phone"
              onChange={updateRegister}
            />
          </InputGroup>
        </FormControl>
        <FormControl w="100%">
          <FormLabel color="gray.500" fontWeight="400">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              onChange={updateRegister}
              name="account_password"
              placeholder="••••••••••••"
              type={showPassword ? "text" : "password"}
              size="lg"
            />
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
          </InputGroup>
        </FormControl>
        <FormControl w="100%">
          <FormLabel color="gray.500" fontWeight="400">
            Store name
          </FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="vaank shop"
            onChange={updateRegister}
            name="account_store"
          />
        </FormControl>

        <Button
          isLoading={isLoading}
          loadingText="Creating your store"
          size="lg"
          w="100%"
          pt="8"
          pb="8"
          fontFamily="elemen"
          style={{ backgroundColor: `#08bd80`, color: `white` }}
          onClick={handleSignUpClick}
        >
          Complete Sign Up
        </Button>
      </Container>
    </AuthPageLayout>
  );
};

export default SignUp;
