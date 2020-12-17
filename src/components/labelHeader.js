import React from "react";
import styles from "./labelHeader.module.css";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const LabelHeader = ({ label, isBackButton }) => {
  const history = useHistory();
  return (
    <div className={styles.header}>
      {isBackButton && (
        <IconButton
          aria-label="BackButton"
          float="left"
          position="absolute"
          left="20px"
          onClick={() => history.goBack()}
          icon={<ChevronLeftIcon w={8} h={8} />}
        />
      )}

      <h1 className={styles.label}>{label}</h1>
    </div>
  );
};

export default LabelHeader;
