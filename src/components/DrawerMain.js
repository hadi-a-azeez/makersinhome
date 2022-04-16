import React, { useEffect, useState } from "react";
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

const DrawerMain = ({
  isDrawer,
  setIsDrawer,
  onSave,
  children,
  title,
  onDrawerClose,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  function handleWindowSizeChange() {
    if (window.innerWidth < 600) setIsMobile(true);
  }

  const closeDrawer = () => {
    setIsDrawer(false);
    onDrawerClose && onDrawerClose();
    onClose();
  };

  useEffect(() => {
    if (isDrawer) onOpen();
    else closeDrawer();
    //get screen size
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [isDrawer]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement={isMobile ? "bottom" : "right"}
        size={isMobile ? "sm" : "md"}
        onClose={closeDrawer}
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMain;
