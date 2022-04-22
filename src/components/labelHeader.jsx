import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./labelHeader.module.css";

const LabelHeader = ({ label, isBackButton, rightIcon = null }) => {
  const history = useHistory();
  return (
    <div className={styles.header}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isBackButton && (
          <IconButton
            marginRight="5px"
            aria-label="BackButton"
            colorScheme="white"
            color="black"
            onClick={() => history.goBack()}
            icon={<ArrowBackIcon w={8} h={8} />}
          />
        )}
        <h1 className={styles.label}>{label}</h1>
      </div>
      <div> {rightIcon}</div>
    </div>
  );
};

export default LabelHeader;
