import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React, { useEffect } from "react";
import { useHeader } from "utils/hooks/useHeader";
import Design from "./Design";
import Links from "./Links";
const LinksMain = () => {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader({ title: "Links" });
  }, []);

  return (
    <>
      <Tabs isFitted colorScheme="green" width="100%">
        <TabList>
          <Tab pl="20px">Links</Tab>
          <Tab>Design</Tab>
        </TabList>

        <TabPanels>
          <TabPanel padding="0">
            <Links />
          </TabPanel>
          <TabPanel p="0">
            <Design />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LinksMain;
