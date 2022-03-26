import React, { useState, useEffect } from "react";
import styles from "../css/signup.module.css";
import { useHistory } from "react-router-dom";
import { signinUserAPI } from "../../../api/sellerAccountAPI";
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Flex,
  Box,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import AuthPageLayout from "../../../layouts/Auth/Login";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  ${tw`flex flex-col gap-3`}
  width: 90%;
`;
const HeadingContainer = tw.div`w-full flex justify-center items-center`;

const Heading = tw.h1`text-2xl font-bold text-center`;

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorCode, setErrorCode] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [isLoginError, setIsLoginError] = useState(false);
  /*  useEffect(() => {
    localStorage.getItem('token') && history.replace('/dashboard')
  }, []); */

  let history = useHistory();

  useEffect(() => {
    //redirect to dashboard if already loginned
    if (localStorage.getItem("token") && localStorage.getItem("loginExpiry")) {
      if (localStorage.getItem("loginExpiry") > Date.now())
        return history.push("/app/dashboard");
    }
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    let response = await signinUserAPI(loginUsername, loginPassword);
    console.log(response);

    setIsLoading(false);
    // check if login detials are incorrect
    if (!response.data.status) {
      setErrorCode(response.data.error.code);
      return setIsLoginError(true);
    }
    //if login details are correct remove previous data
    localStorage.removeItem("token");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("loginExpiry", Date.now() + 1.123e9);
    history.push("/app/dashboard");
  };
  return (
    <AuthPageLayout>
      <Container>
        <HeadingContainer>
          <Heading className={styles.heading_bold_big}>Log in to Saav</Heading>
        </HeadingContainer>
        {isLoginError && (
          <Box
            borderRadius="md"
            bg="tomato"
            color="white"
            p="3"
            w="100%"
            mb="3"
          >
            <h1>
              {errorCode && errorCode === 101
                ? "This Number Isnt Registered."
                : errorCode === 102
                ? "Your Account Is Deactivated"
                : "Your Password Is Wrong"}
            </h1>
          </Box>
        )}
        <FormControl w="100%">
          <FormLabel color="gray.500" fontWeight="400">
            Phone No
          </FormLabel>
          <Input
            type="number"
            size="lg"
            placeholder="Phone number"
            onChange={(e) => setLoginUsername(e.target.value)}
          />
        </FormControl>
        <FormControl w="100%">
          <FormLabel color="gray.500" fontWeight="400">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="••••••••••••"
              type={showPassword ? "text" : "password"}
              size="lg"
              onChange={(e) => setLoginPassword(e.target.value)}
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

        <Button
          isLoading={isLoading}
          loadingText="Signing in"
          size="lg"
          w="100%"
          pt="8"
          pb="8"
          style={{ backgroundColor: `#08bd80`, color: `white` }}
          onClick={signIn}
        >
          Log in
        </Button>
        <Text
          onClick={() =>
            window.location.replace(
              `https://api.whatsapp.com/send?phone=916282672467&text=Hi%20i%20forgot%20my%20password.`
            )
          }
          alignSelf="flex-end"
          color="#008aed"
        >
          Forgot Password ?
        </Text>
        <Flex direction="row">
          <Text color="gray.500" isTruncated>
            Don't have an account yet?
          </Text>
          <Link to="/signup" style={{ marginLeft: 5 }}>
            <Text style={{ color: `#5b97ef` }}>Sign Up</Text>
          </Link>
        </Flex>
      </Container>
    </AuthPageLayout>
  );
};

export default SignIn;
