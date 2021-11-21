import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import LabelHeader from "../../../components/labelHeader";
import Design from "./Design";
import Links from "./Links";
const LinksMain = () => {
  return (
    <>
      <LabelHeader label="Links" />
      <Tabs isFitted colorScheme="green">
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
