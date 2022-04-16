import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
import { Container } from "../../../components/Container";
import SellerPageLayout from "../../../layouts/Seller";
import Design from "./Design";
import Links from "./Links";
const LinksMain = () => {
  return (
    <>
      <SellerPageLayout label="Links">
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
      </SellerPageLayout>
    </>
  );
};

export default LinksMain;
