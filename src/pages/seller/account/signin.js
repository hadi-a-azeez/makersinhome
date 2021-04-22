import React, { useState, useEffect } from "react";
import styles from "../css/signup.module.css";
import { useHistory } from "react-router-dom";
import Header from "../../../components/header";
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
  Image,
} from "@chakra-ui/react";
import AddToCart from "../../../assets/addtocart.svg";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    if (!response.data.status) return setIsLoginError(true);
    //if login details are correct remov previous data
    localStorage.removeItem("token");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("loginExpiry", Date.now() + 1.123e9);
    history.push("/app/dashboard");
  };
  return (
    <div className={styles.container}>
      <Header signup={true} />
      <div className={styles.heading_block}>
        <Text fontWeight="600" fontSize="28px">
          Log in to Saav
        </Text>
        {/* <h1 className={styles.heading_bold_big}>Log in to Vaank</h1> */}
      </div>
      {isLoginError && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>Please check your login details</h1>
        </Box>
      )}
      <div className={styles.input_group}>
        <FormControl w="90%">
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
        <FormControl w="90%" mt="4">
          <FormLabel color="gray.500" fontWeight="400">
            Password
          </FormLabel>
          <Input
            placeholder="••••••••••••"
            type="password"
            size="lg"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </FormControl>

        <Button
          isLoading={isLoading}
          loadingText="Signing in"
          size="lg"
          w="90%"
          mt="7"
          pt="8"
          pb="8"
          style={{ backgroundColor: `#00b140`, color: `white` }}
          onClick={signIn}
        >
          Log in
        </Button>
      </div>
      <Flex direction="row" mt="6">
        <Text color="gray.500" isTruncated>
          Don't have an account yet?
        </Text>
        <Link to="/signup" style={{ marginLeft: 5 }}>
          <Text style={{ color: `#5b97ef` }}>Sign Up</Text>
        </Link>
      </Flex>
      <Image src={AddToCart} width="70%" mt="8 " />
    </div>
  );
};

export default SignIn;
