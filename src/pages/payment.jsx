import { Button } from "@chakra-ui/button";
import axios from "axios";
import SaavLogo from "../assets/saav_complete_logo.png";
import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";

const Payment = () => {
  const [amount_local, setAmount] = useState();

  const loadScript = (src) => {
    return new Promise((res) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        res(true);
      };
      script.onerror = () => {
        res(false);
      };
      document.body.appendChild(script);
    });
  };

  async function displayRazorpay() {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // creating a new order
      const result = await axios.post(
        "https://wecollab.club/api/payment/orders",
        { amount_local }
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_live_sYyNyGPw76CLSy", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Formfillups",
        description: "Buying Subscription",

        order_id: order_id,
        handler: async function (response) {
          console.log("finished response", response);
        },
        prefill: {
          name: "Boby tudu",
          email: "js903783@gmail.com",
          contact: "7004212602",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box p="20px">
      <Input
        type="number"
        value={amount_local}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button colorScheme="teal" onClick={displayRazorpay}>
        Pay Now
      </Button>
    </Box>
  );
};

export default Payment;
