import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getStoreInfoAPI, updateSettings } from "../../../api/sellerAccountAPI";
import LabelHeader from "../../../components/labelHeader";
import styles from "../css/editAccount.module.css";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storeSettingsData, setStoreSettingsData] = useState({});
  const [isFormError, setIsFormError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const toast = useToast();

  const validateFields = (formAction) => {
    setIsFormError(false);
    return formAction();
  };

  useEffect(() => {
    const getStoreInfo = async () => {
      setIsLoading(true);
      let {
        data: { data: storeData },
      } = await getStoreInfoAPI();
      console.log(storeData);
      if (storeData.settings.length > 0) {
        console.log("here");
        setStoreSettingsData(storeData.settings[0]);
      } else setStoreSettingsData({ show_outofstock: false });
      setIsLoading(false);
    };
    getStoreInfo();
  }, []);

  const updateStore = async () => {
    setIsBtnLoading(true);
    await updateSettings({ ...storeSettingsData });
    setIsBtnLoading(false);
    toast({
      title: "Settings updated.",
      description: "store settings updated successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "bottom",
    });
  };

  return (
    <div className={styles.container}>
      <LabelHeader label={"Store Settings"} isBackButton="true" />
      {isLoading ? (
        <div className={styles.loaderwraper}>
          <Loader
            type="Oval"
            color="#00b140"
            height={50}
            width={50}
            visible={isLoading}
          />
        </div>
      ) : (
        <div></div>
      )}

      {isFormError && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>Please fill all required details</h1>
        </Box>
      )}

      <FormControl isRequired w="90%" mt="20px">
        <FormLabel>Show Out Of Stock Products</FormLabel>
        <Switch
          isChecked={storeSettingsData?.show_outofstock ? true : false}
          size="lg"
          colorScheme="green"
          onChange={() =>
            setStoreSettingsData((old) => ({
              ...old,
              show_outofstock: !old.show_outofstock,
            }))
          }
        />
      </FormControl>

      <Button
        isLoading={isBtnLoading}
        loadingText="Updating"
        backgroundColor="#08bd80"
        colorScheme="green"
        color="white"
        size="lg"
        w="90%"
        mt="20px"
        onClick={() => validateFields(updateStore)}
      >
        Update Store Info
      </Button>
    </div>
  );
};

export default EditAccount;
