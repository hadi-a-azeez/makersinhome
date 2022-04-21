import {
  Modal,
  ModalOverlay,
  ModalBody,
  Flex,
  ModalContent,
  Img,
  ModalCloseButton,
  Stack,
  Box,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const ImageModal = ({ image, isImageOpen, onImageClose }) => {
  return (
    <Modal isOpen={isImageOpen} onClose={onImageClose} size="lg" isCentered>
      <ModalOverlay />

      <ModalContent w="100vw" h="100vh" backgroundColor="gray.100">
        <ModalBody>
          <Stack height="100%" justifyContent="center" alignItems="center">
            <TransformWrapper>
              <TransformComponent>
                <Box
                  h="100vh"
                  w="100vw"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Img src={image} maxWidth="90%" maxHeight="80%" />
                </Box>
              </TransformComponent>
            </TransformWrapper>
          </Stack>
          <ModalCloseButton
            mt="50px"
            mr="10px"
            border="3px solid black"
            padding="20px"
            backgroundColor="#fff"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
