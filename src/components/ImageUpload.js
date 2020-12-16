import React, { forwardRef, useImperativeHandle } from "react";
import imageCompression from "browser-image-compression";
import axios from "axios";

const ImageUpload = forwardRef(
  ({ imageName, imageServer, imageCallback, isMultiple }, ref) => {
    useImperativeHandle(ref, () => ({
      uploadImage() {
        imageToServer();
      },
    }));

    const compressImage = async (event) => {
      //compresses image to below 1MB
      let imagesFromInput = event.target.files;
      let imagesCompressed = [];
      console.log(event.target.files[0]);
      const options = {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      try {
        for (let i = 0; i < imagesFromInput.length; i++) {
          const compressedFile = await imageCompression(
            imagesFromInput[i],
            options
          );
          imagesCompressed.push(compressedFile);
        }

        const serverImageResponse = await imageToServer(imagesCompressed);
        const imageFromServer = serverImageResponse.data.data.profile_image;
        imageCallback(imageFromServer);
        // setProductImageConverted(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.log(error);
      }
    };
    const imageToServer = async (imageFiles) => {
      let formData = new FormData();
      imageFiles.map((image) => {
        formData.append(imageName, image);
      });

      try {
        const response = await axios.post(imageServer, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    const inputTag =
      isMultiple.toLowerCase() == "true" ? (
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(event) => compressImage(event)}
          multiple
        />
      ) : (
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(event) => compressImage(event)}
        />
      );
    return inputTag;
  }
);

export default ImageUpload;
