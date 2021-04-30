import React, { useState, useEffect } from "react";
import styles from "../css/editAccount.module.css";
import Loader from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import "../../../../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LabelHeader from "../../../components/labelHeader";
import { useForm } from "../../../components/useForm";
import { updateStoreAPI } from "../../../api/sellerStoreAPI";
import { profileImagesRoot } from "../../../config";
import {
  getStoreInfoAPI,
  uploadProfileImageAPI,
} from "../../../api/sellerAccountAPI";
import {
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Box,
  useToast,
} from "@chakra-ui/react";

const EditAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageEdited, setImageEdited] = useState(false);
  const [compressedImagesState, setCompreseesdImagesState] = useState([]);
  const [storeInfo, setStoreInfo, updateStoreInfo] = useForm([]);
  const [isFormError, setIsFormError] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const toast = useToast();

  const compressImage = async (event) => {
    //compresses image to below 1MB
    let imagesFromInput = event.target.files;
    let imagesCompressed = [];
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 200,
      fileType: "image/jpeg",
      useWebWorker: true,
    };
    try {
      for (let i = 0; i < imagesFromInput.length; i++) {
        const compressedFile = await imageCompression(
          imagesFromInput[i],
          options
        );
        let imageName = uuidv4() + ".jpg";
        console.log(compressedFile);
        const convertedBlobFile = new File(
          [compressedFile],
          Date.now() + Math.floor(100000 + Math.random() * 900000) + imageName,
          {
            type: imagesFromInput[i].type,
            lastModified: Date.now(),
          }
        );
        imagesCompressed.push(convertedBlobFile);
      }

      setCompreseesdImagesState(imagesCompressed);
      setImageEdited(true);
    } catch (error) {
      console.log(error);
    }
  };
  const validateFields = (formAction) => {
    if (storeInfo.account_store != "" && storeInfo.account_whatsapp != "") {
      setIsFormError(false);
      return formAction();
    }
    setIsFormError(true);
  };

  useEffect(() => {
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
    <div className={styles.container}>
      <LabelHeader label={"Edit business details"} isBackButton="true" />
      <div style={{ marginTop: "70px" }} />
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
      <div className={styles.image_block}>
        <div className={styles.thumbnail}>
          <img
            src={
              isImageEdited
                ? URL.createObjectURL(compressedImagesState[0])
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
        color="white"
        size="lg"
        w="90%"
        mt="3"
        mb="20"
        onClick={() => validateFields(updateStore)}
      >
        Update Store Info
      </Button>
    </div>
  );
};

export default EditAccount;
