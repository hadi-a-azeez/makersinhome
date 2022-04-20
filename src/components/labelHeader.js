import React from "react";
import styles from "./labelHeader.module.css";
import {
  ChevronLeftIcon,
  ArrowBackIcon,
  CloseIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { IconButton, Button, Box } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const LabelHeader = ({ label, isBackButton, rightIcon = null }) => {
  const history = useHistory();
  return (
    <div className={styles.header}>
      {isBackButton && (
        <IconButton
          aria-label="BackButton"
          position="absolute"
          left="20px"
          colorScheme="white"
          color="black"
          onClick={() => history.goBack()}
          icon={<ArrowBackIcon w={8} h={8} />}
        />
      )}

      <h1 className={styles.label}>{label}</h1>
      <div style={{ position: "absolute", right: "15px" }}> {rightIcon}</div>
    </div>
  );
};

export default LabelHeader;
