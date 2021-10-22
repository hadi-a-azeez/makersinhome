import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { useHistory } from "react-router-dom";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../../../components/labelHeader";
import BottomNavigationMenu from "../../../components/bottomNavigation";
const Links = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label="Links" />
        Limks
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Links;
