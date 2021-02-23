import React, { useState } from "react";
import styles from "../css/signup.module.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import AddToCart from "../../../assets/addtocart.svg";
import { useForm } from "../../../components/useForm";
import { apiRoot } from "../../../config";
import axios from "axios";

const SignUp = () => {
  const [register, setRegister, updateRegister] = useForm({
    account_phone: "",
    account_password: "",
    account_store: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignUpError, setIsSignUpError] = useState(false);

  const handleSignUpClick = async () => {
    let isValidate = validation();
    console.log(isValidate);
    if (isValidate) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${apiRoot}/seller/register`,
          register,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        if (response.data.status_code === 400) {
          setErrorMessage(response.data.error.message);
          setIsSignUpError(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const validation = () => {
    if (register.account_phone.length !== 10) {
      setIsSignUpError(true);
      setErrorMessage("Enter valid phone number");
      return false;
    }
    if (register.account_password.length < 6) {
      setIsSignUpError(true);
      setErrorMessage("The minimum password length is at least 6 characters");
      return false;
    }
    if (register.account_store.length < 1) {
      setIsSignUpError(true);
      setErrorMessage("Enter store name");
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading_block}>
        <h1 className={styles.heading_normal}>Create your</h1>
        <h1 className={styles.heading_bold}>&nbsp;FREE</h1>
        <h1 className={styles.heading_normal}>&nbsp;store.</h1>
      </div>
      {isSignUpError && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>{errorMessage}</h1>
        </Box>
      )}
      <div className={styles.input_group}>
        <FormControl w="90%" mt="3">
          <FormLabel color="gray.500" fontWeight="400">
            Phone No
          </FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="Phone number"
            name="account_phone"
            onChange={updateRegister}
          />
        </FormControl>
        <FormControl w="90%" mt="3">
          <FormLabel color="gray.500" fontWeight="400">
            Password
          </FormLabel>
          <Input
            type="password"
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
          loadingText="Signing Up"
          size="lg"
          w="90%"
          mt="7"
          pt="8"
          pb="8"
          style={{ backgroundColor: `#00b140`, color: `white` }}
          onClick={handleSignUpClick}
        >
          Sign Up
        </Button>
      </div>
      <Image src={AddToCart} width="70%" mt="8" />
    </div>
  );
};

export default SignUp;
