import React, { useEffect, useState } from "react";
import styles from "../pages/css/dashboard.module.css";
import { Stack } from "@chakra-ui/react";
import WhatsappLogo from "../assets/logo-whatsapp.svg";
import ReactGA from "react-ga";

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
    ReactGA.event({
      category: "PWA Install",
      action: `Installed PWA From Dashboard `,
    });
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
  ) : (
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
      <h1 className={styles.text}>🎉 Official Saav Sellers Group</h1>

      <button
        className={styles.btn_whatsapp}
        onClick={() =>
          window.location.replace(
            `https://chat.whatsapp.com/JWEKR2kuhpR81ZGB5aa4FQ`
          )
        }
      >
        <img src={WhatsappLogo} alt="w" className={styles.whatsappicon} />
        Join Now
      </button>
    </Stack>
  );
};

export default PwaInstall;
