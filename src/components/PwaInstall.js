import React, { useEffect, useState } from "react";
import styles from "../pages/seller/css/dashboard.module.css";
import { Stack } from "@chakra-ui/react";

const PwaInstall = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      borderRadius="30px"
      w="90%"
      mt="-60px"
      zIndex="1"
      p="8px"
      backgroundColor="#fff"
    >
      <h1 className={styles.text}>🎉 Saav App Released</h1>

      <button className={styles.btn_whatsapp} onClick={onClick}>
        Install Now
      </button>
    </Stack>
  );
};

export default PwaInstall;
