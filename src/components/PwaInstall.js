import React, { useEffect, useState } from "react";
import styles from "../pages/seller/css/dashboard.module.css";
import { Stack } from "@chakra-ui/react";
let deferredPrompt;

const PwaInstall = () => {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = (e) => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };

  return installable ? (
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

      <button className={styles.btn_whatsapp} onClick={handleInstallClick}>
        Install Now
      </button>
    </Stack>
  ) : null;
};

export default PwaInstall;
