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
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Stack,
  HStack,
} from "@chakra-ui/react";
import firebase from "../../../firebase";
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
  const [isOtpPage, setIsOtpPage] = useState(false);
  const [otpUser, setOtpUser] = useState();

  const handleSignUpClick = async () => {
    let isValidate = validation();
    console.log(isValidate);
    if (isValidate) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${apiRoot}/seller/register/checkphone/${register.account_phone}`
        );

        if (!response.data.status) {
          setErrorMessage("Already Registered");
          setIsSignUpError(true);
        } else {
          setIsSignUpError(false);
          sendOtp(register.account_phone);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  };
  const sendOtp = async (phoneNo) => {
    console.log(`91${phoneNo}`);
    setUpRecaptcha();

    firebase
      .auth()
      .signInWithPhoneNumber(`+91${phoneNo}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setIsLoading(false);
        setIsOtpPage(true);
        setIsLoading(false);
        console.log(confirmationResult);
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };
  const verifyOtp = async (otpTyped) => {
    const result = await window.confirmationResult.confirm(otpTyped);
    console.log(result);
  };

  const validation = () => {
    if (register.account_phone.length !== 10) {
      setIsSignUpError(true);
      setErrorMessage("Enter valid phone number");
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
      <div id="recaptcha-container" />
      {isSignUpError && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>{errorMessage}</h1>
        </Box>
      )}

      {!isOtpPage && (
        <div className={styles.input_group}>
          <FormControl w="90%" mt="3">
            <FormLabel color="gray.500" fontWeight="400">
              Whatsapp No
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
            style={{ backgroundColor: `#00b140`, color: `white` }}
            onClick={handleSignUpClick}
          >
            Sign Up
          </Button>
        </div>
      )}

      {isOtpPage && (
        <>
          <Stack direction="column" justifyContent="center">
            <FormLabel
              color="black.300"
              fontWeight="400"
              textAlign="center"
              fontSize="16px"
            >
              Please Enter <b>OTP</b> we send you.
            </FormLabel>

            <Input
              border="2px"
              alignSelf="center"
              mt="20px"
              mb="20px"
              type="number"
              size="lg"
              width="180px"
              placeholder="123456"
              fontSize="30px"
              textAlign="center"
              height="60px"
              onChange={(e) => setOtpUser(e.target.value)}
            />

            <Button
              isLoading={isLoading}
              loadingText="Completing Registration"
              size="lg"
              w="100%"
              mt="20"
              pt="8"
              pb="8"
              style={{ backgroundColor: `#00b140`, color: `white` }}
              onClick={() => {
                console.log(otpUser);
                verifyOtp(otpUser);
              }}
            >
              Complete Registration
            </Button>
          </Stack>
        </>
      )}
      <Image src={AddToCart} width="70%" mt="8" />
    </div>
  );
};

export default SignUp;
