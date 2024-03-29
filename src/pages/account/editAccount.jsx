import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Switch,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useHeader } from "utils/hooks/useHeader";
import { v4 as uuidv4 } from "uuid";
import {
  getStoreInfoAPI,
  uploadProfileImageAPI,
} from "../../api/sellerAccountAPI";
import { updateStoreAPI } from "../../api/sellerStoreAPI";
import { Container } from "../../components/Container";
import { useForm } from "../../utils/hooks/useForm";
import { profileImagesRoot } from "../../config";
import { compressSingleImage } from "../../utils/imageCompresser";
import styles from "../css/editAccount.module.css";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageEdited, setImageEdited] = useState(false);
  const [compressedImagesState, setCompreseesdImagesState] = useState([]);
  const [storeInfo, setStoreInfo, updateStoreInfo] = useForm([]);
  const [isFormError, setIsFormError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const toast = useToast();
  const { setHeader } = useHeader();

  const compressImage = async (event) => {
    //compresses image to below 1MB
    let imageName = uuidv4() + ".jpg";
    let profileCompressed = await compressSingleImage(
      event.target?.files[0],
      imageName,
      {
        quality: 0.5,
        maxSizeMB: 0.15,
        maxWidth: 480,
        maxHeight: 480,
      }
    );
    setCompreseesdImagesState(profileCompressed);
    setImageEdited(true);
  };
  const validateFields = (formAction) => {
    if (storeInfo.account_store != "" && storeInfo.account_whatsapp != "") {
      setIsFormError(false);
      return formAction();
    }
    setIsFormError(true);
  };

  useEffect(() => {
    setHeader({ title: "Edit business details", isBackButton: true });
    const getStoreInfo = async () => {
      setIsLoading(true);
      let response = await getStoreInfoAPI();
      setStoreInfo(response.data.data);
      console.log(response.data.data);
      setIsLoading(false);
    };
    getStoreInfo();
  }, []);

  const updateStore = async () => {
    setIsBtnLoading(true);
    let storeinfoNew = { ...storeInfo };
    if (isImageEdited) {
      await uploadProfileImageAPI(
        compressedImagesState,
        storeInfo.account_store_image
      );
      delete storeinfoNew.account_store_image;
    }

    await updateStoreAPI(storeinfoNew);

    setIsBtnLoading(false);
    toast({
      title: "Store updated.",
      description: "store details updated successfully.",
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
      <div className={styles.image_block}>
        <div className={styles.thumbnail}>
          <img
            src={
              isImageEdited
                ? URL.createObjectURL(compressedImagesState)
                : `${profileImagesRoot}/${storeInfo.account_store_image}`
            }
            alt="image"
            className={styles.thumbnail_image}
          />
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        id="file-upload"
        onChange={(event) => compressImage(event)}
      />
      <label htmlFor="file-upload" className={styles.link}>
        Update store image
      </label>
      {isFormError && (
        <Box borderRadius="md" bg="tomato" color="white" p="3" w="90%" mb="3">
          <h1>Please fill all required details</h1>
        </Box>
      )}

      <FormControl isRequired w="90%" mt="3">
        <FormLabel>Store Status</FormLabel>
        <Switch
          isChecked={storeInfo.account_store_status ? true : false}
          size="lg"
          colorScheme="green"
          onChange={() =>
            setStoreInfo({
              ...storeInfo,
              account_store_status: !storeInfo.account_store_status,
            })
          }
        />
      </FormControl>
      <FormControl isRequired w="90%" mt="3">
        <FormLabel>Store name</FormLabel>
        <Input
          variant="filled"
          name="account_store"
          size="lg"
          value={storeInfo.account_store || ""}
          onChange={updateStoreInfo}
        />
      </FormControl>
      <FormControl isRequired w="90%" mt="4">
        <FormLabel>Whatsapp Number</FormLabel>
        <Input
          variant="filled"
          name="account_whatsapp"
          size="lg"
          value={storeInfo.account_whatsapp || ""}
          onChange={updateStoreInfo}
        />
      </FormControl>
      <FormControl w="90%" mt="4">
        <FormLabel>Address</FormLabel>
        <Textarea
          rows="3"
          variant="filled"
          name="account_store_address"
          value={storeInfo.account_store_address || ""}
          onChange={updateStoreInfo}
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
        mt="3"
        mb="20"
        onClick={() => validateFields(updateStore)}
      >
        Update Store Info
      </Button>
    </Container>
  );
};

export default EditAccount;
