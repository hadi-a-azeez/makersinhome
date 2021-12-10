import { Box, Button, Heading, Image, Skeleton, Stack } from "@chakra-ui/react";
import { produce } from "immer";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  addLink,
  getLinksAPI,
  reorderLinks,
} from "../../../api/sellerLinksAPI";
import EmptyLinksImage from "../../../assets/empty_links.png";
import BottomNavigationMenu from "../../../components/bottomNavigation";
import LinkItem from "../../../components/LinkItem";
import Drawers from "./Drawers";

const Links = () => {
  const [isLoading, setIsLoading] = useState("MAIN");
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading("MAIN");
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
      setIsLoading(null);
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
    <Box bgColor="#f1f1f1" minH="100vh">
      <Stack w="100%" pl="6%" pr="6%" direction="column">
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
                  {isLoading !== "MAIN" ? (
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
                  {isLoading !== "MAIN" && links.length === 0 && (
                    <Stack direction="column" alignItems="center" mt="30px">
                      <Image src={EmptyLinksImage} w="60%" />
                      <Heading pt="20px" size="md" pb="20px" color="#3b3b3b">
                        No Links Added!
                      </Heading>
                      <Button
                        backgroundColor="#08bd80"
                        colorScheme="green"
                        color="white"
                        size="lg"
                        w="70%"
                        onClick={() => setIsLinkDrawer(true)}
                      >
                        Add New Link
                      </Button>
                    </Stack>
                  )}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          }
        </DragDropContext>
      </Stack>
      <Drawers
        userData={userData}
        setIsEditDrawer={setIsEditDrawer}
        isLinkDrawer={isLinkDrawer}
        setIsLinkDrawer={setIsLinkDrawer}
        setLinkNew={setLinkNew}
        linkNew={linkNew}
        addNewLink={addNewLink}
        links={links}
        setLinks={setLinks}
        isTitleDrawer={isTitleDrawer}
        isEditDrawer={isEditDrawer}
        setIsTitleDrawer={setIsTitleDrawer}
        setSelectedEditLink={setSelectedEditLink}
        selectedEditLink={selectedEditLink}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <BottomNavigationMenu />
    </Box>
  );
};

export default Links;
