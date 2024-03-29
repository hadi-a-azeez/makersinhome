import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Switch,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHeader } from "utils/hooks/useHeader";
import { getStoreInfoAPI, updateSettings } from "../../api/sellerAccountAPI";
import { Container } from "../../components/Container";
import styles from "../css/editAccount.module.css";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storeSettingsData, setStoreSettingsData] = useState({});
  const [isFormError, setIsFormError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const toast = useToast();
  const { setHeader } = useHeader();

  const validateFields = (formAction) => {
    setIsFormError(false);
    return formAction();
  };

  useEffect(() => {
    setHeader({ title: "Edit Settings", isBackButton: true });
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
    <Container>
      {isLoading ? (
        <div className={styles.loaderwraper}>
          <Spinner
            thickness="5px"
            emptyColor="gray.200"
            color="green.500"
            size="xl"
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
    </Container>
  );
};

export default EditAccount;
