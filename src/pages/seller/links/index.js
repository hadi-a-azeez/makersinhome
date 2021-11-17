import { Box, Button, Heading, Stack, Text, Skeleton } from "@chakra-ui/react";
import { produce } from "immer";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { updateSettings } from "../../../api/sellerAccountAPI";
import {
  addLink,
  getLinksAPI,
  reorderLinks,
} from "../../../api/sellerLinksAPI";
import BottomNavigationMenu from "../../../components/bottomNavigation";
import LabelHeader from "../../../components/labelHeader";
import LinkItem from "../../../components/LinkItem";
import styles from "../css/products.module.css";
import Drawers from "./Drawers";

const Links = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDrawer, setIsEditDrawer] = useState(false);
  const [isLinkDrawer, setIsLinkDrawer] = useState(false);
  const [isTitleDrawer, setIsTitleDrawer] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedEditLink, setSelectedEditLink] = useState("");
  const [userData, setUserData] = useState("");
  const [linkNew, setLinkNew] = useState({
    name: "",
    url: "",
    type: "LINK",
  });
  const [links, setLinks] = useState([]);

  const linksThemes = [
    { id: "summer", name: "Summer" },
    { id: "saav_x_nasim", name: "Saav x Nasim" },
    { id: "retro", name: "Retro" },
    { id: "neon_nights", name: "Saav x Ahmed" },
  ];

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getLinksAPI();
      if (response.data.data) {
        setLinks(response.data.data.links);
        response?.data?.data?.user_settings?.links_theme
          ? setSelectedTheme(response?.data?.data?.user_settings?.links_theme)
          : setSelectedTheme("summer");
        setUserData({
          settings: response.data.data?.user_settings,
          info: response.data.data?.account_info,
        });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const updateLinks = async (linksUpdated) => {
    //remove id and add position
    let newLinks = linksUpdated?.map((link, index) => ({
      ...link,
      position: index + 1,
    }));
    await reorderLinks({
      links: newLinks,
    });
  };

  const updateSelectedTheme = async (theme) => {
    await updateSettings({ links_theme: theme });
  };

  const linkTypes = [
    {
      name: "Link",
      value: "LINK",
      placeholder: "https://www.example.com",
      formatter: (val) => {
        if (!/^https?:\/\//i.test(val)) return "http://" + val;
        return val;
      },
    },
    {
      name: "Message Whatsapp",
      value: "MESSAGE_WHATSAPP",
      placeholder: "Whatsapp Number",
      type: "number",
      defaultTitle: "Message On Whatsapp",
      formatter: (val) => `https://api.whatsapp.com/send?phone=${val}`,
    },
    {
      name: "Call Mobile",
      value: "CALL_MOBILE",
      placeholder: "Mobile Number",
      type: "number",
      defaultTitle: "Call Us",
      formatter: (val) => `tel:${val}`,
    },
    {
      name: "Saav Store",
      value: "SAAV_STORE",
      defaultTitle: "Shop Our Products",
      formatter: () =>
        `https://saav.in/store/${userData?.info.account_store_link}`,
    },
  ];

  const addNewLink = async (link) => {
    const response = await addLink({ link });
    setLinks((old) => [...old, response.data.data]);
  };

  const reorder = async (sourceIndex, destinationIndex) => {
    let newLinks = produce(links, (draft) => {
      const [removed] = draft.splice(sourceIndex, 1);
      draft.splice(destinationIndex, 0, removed);
    });
    setLinks(newLinks);
    await updateLinks(newLinks);
  };
  const onDragEnd = (result) => {
    //dropped outside the list
    if (!result.destination) {
      return;
    }

    reorder(result.source.index, result.destination.index);
  };

  return (
    <>
      <div className={styles.container}>
        <LabelHeader label="Links" />

        <Stack w="100%" pl="6%" pr="6%" direction="column">
          <Heading pt="20px" size="md" alignSelf="flex-start">
            Theme
          </Heading>
          <Stack direction="row" mb="10px" overflow="auto" whiteSpace="nowrap">
            {linksThemes.map((item) => (
              <Stack
                key={item.id}
                border={
                  selectedTheme === item.id
                    ? "3px solid #08BD80"
                    : "1px solid grey"
                }
                borderRadius="5px"
                padding="5px"
                backgroundColor="white"
                h="50px"
                justifyContent="center"
                alignItems="center"
                paddingLeft="10px"
                paddingRight="10px"
                onClick={async () => {
                  setSelectedTheme(item.id);
                  await updateSelectedTheme(item.id);
                }}
              >
                <Text>{item.name}</Text>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" mt="8">
            <Button
              backgroundColor="#08bd80"
              colorScheme="green"
              color="white"
              size="lg"
              w="70%"
              onClick={() => setIsLinkDrawer(true)}
            >
              Add Link
            </Button>
            <Button
              backgroundColor="white"
              size="lg"
              w="30%"
              onClick={() => setIsTitleDrawer(true)}
            >
              + Title
            </Button>
          </Stack>
          <Heading pt="20px" size="md">
            My links
          </Heading>
          <DragDropContext onDragEnd={onDragEnd}>
            {
              <Droppable droppableId="droppable">
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    mb="100px"
                  >
                    {!isLoading ? (
                      links.map((item, i) => (
                        <LinkItem
                          item={item}
                          key={item.id}
                          index={i}
                          setIsDrawer={setIsEditDrawer}
                          setSelectedEditLink={setSelectedEditLink}
                        />
                      ))
                    ) : (
                      <>
                        <Skeleton
                          height="50px"
                          w="100%"
                          mt="3"
                          borderRadius="6px"
                        />
                        <Skeleton
                          height="50px"
                          w="100%"
                          mt="3"
                          borderRadius="6px"
                        />
                        <Skeleton
                          height="80px"
                          w="100%"
                          mt="3"
                          borderRadius="6px"
                        />
                      </>
                    )}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            }
          </DragDropContext>
        </Stack>
        <Drawers
          setIsEditDrawer={setIsEditDrawer}
          isLinkDrawer={isLinkDrawer}
          setIsLinkDrawer={setIsLinkDrawer}
          setLinkNew={setLinkNew}
          linkNew={linkNew}
          linkTypes={linkTypes}
          addNewLink={addNewLink}
          links={links}
          setLinks={setLinks}
          isTitleDrawer={isTitleDrawer}
          isEditDrawer={isEditDrawer}
          setIsTitleDrawer={setIsTitleDrawer}
          setSelectedEditLink={setSelectedEditLink}
          selectedEditLink={selectedEditLink}
        />
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Links;
