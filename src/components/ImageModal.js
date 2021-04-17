import {
  Modal,
  ModalOverlay,
  ModalBody,
  Flex,
  ModalContent,
  Img,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import styles from "./css/product_detailed.module.css";
import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = ({ image, isImageOpen, onImageClose }) => {
  return (
    <Modal isOpen={isImageOpen} onClose={onImageClose} size="lg" isCentered>
      <ModalOverlay />

      <ModalContent w="100%" h="100vh" backgroundColor="gray.100">
        <ModalBody>
          <ModalCloseButton
            mt="20px"
            mr="10px"
            border="3px solid black"
            padding="20px"
            backgroundColor="#fff"
          />
          <Stack height="100%" justifyContent="center" alignItems="center">
            <TransformWrapper>
              <TransformComponent>
                <img src={image} style={{ width: "100vw" }} />
              </TransformComponent>
            </TransformWrapper>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
