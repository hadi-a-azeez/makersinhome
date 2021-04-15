import React, { useState } from "react";
import styles from "../css/signup.module.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Image,
  InputGroup,
  InputLeftAddon,
  Text,
  Stack,
} from "@chakra-ui/react";
import AddToCart from "../../../assets/addtocart.svg";
import { useForm } from "../../../components/useForm";
import { apiRoot } from "../../../config";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [register, setRegister, updateRegister] = useForm({
    account_phone: "",
    account_store: "",
    account_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSignUpClick = async () => {
    let isValidate = validation();
    console.log(isValidate);
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
    <div className={styles.container}>
      <Stack w="100%" direction="row" mt="10px" justifyContent="space-between">
        <Text>Logo</Text>
        <Text mr="20px" color="#0075f2" onClick={() => history.push("/login")}>
          Login
        </Text>
      </Stack>
      <div className={styles.heading_block}>
        <h1 className={styles.heading_normal}>Create your own</h1>
        <h1 className={styles.heading_bold}>&nbsp;FREE</h1>
        <h1 className={styles.heading_normal}>&nbsp;store.</h1>
      </div>
      {errorMessage.length > 1 && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>{errorMessage}</h1>
        </Box>
      )}

      <div className={styles.input_group}>
        <FormControl w="90%" mt="3">
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
        <FormControl w="90%" mt="3">
          <FormLabel color="gray.500" fontWeight="400">
            Password
          </FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="••••••••••••"
            onChange={updateRegister}
            name="account_password"
          />
        </FormControl>
        <FormControl w="90%" mt="3">
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
          loadingText="Sending OTP"
          size="lg"
          w="90%"
          mt="7"
          pt="8"
          pb="8"
          fontFamily="elemen"
          style={{ backgroundColor: `#00b140`, color: `white` }}
          onClick={handleSignUpClick}
        >
          Complete Sign Up
        </Button>
      </div>

      <Image src={AddToCart} width="70%" mt="8" />
    </div>
  );
};

export default SignUp;
