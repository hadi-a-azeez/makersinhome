import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

const DrawerMain = ({ isDrawer, setIsDrawer, onSave, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeDrawer = () => {
    setIsDrawer(false);
    onClose();
  };

  useEffect(() => {
    if (isDrawer) onOpen();
    else closeDrawer();
  }, [isDrawer]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={closeDrawer}
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add new link</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMain;
