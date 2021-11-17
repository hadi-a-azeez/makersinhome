import { TabList, TabPanels, TabPanel, Tabs, Tab } from "@chakra-ui/tabs";
import React from "react";
import LabelHeader from "../../../components/labelHeader";
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
          <TabPanel padding="0" m="0">
            <Links />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LinksMain;
