import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { useHistory } from "react-router-dom";
import { Stack, Button, Heading, Box, Input } from "@chakra-ui/react";
import LabelHeader from "../../../components/labelHeader";
import BottomNavigationMenu from "../../../components/bottomNavigation";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { produce } from "immer";
import LinkItem from "../../../components/LinkItem";
import DrawerMain from "../../../components/DrawerMain";

const Links = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isTitleDrawer, setIsTitleDrawer] = useState(false);

  let history = useHistory();
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Link 1",
      url: "https://www.google.comssssssssssssssssssssssss",
      image: "https://picsum.photos/200",
      position: 1,
    },
    {
      id: 2,
      title: "Link 2",
      url: "https://www.google.com",
      image: "https://picsum.photos/200",
      position: 2,
    },
    {
      id: 3,
      title: "Link 3",
      url: "https://www.google.com",
      image: "https://picsum.photos/200",
      position: 3,
    },
  ]);

  useEffect(() => {
    let newLinks = links.map((link) => {
      return { ...link, position: links.indexOf(link) + 1 };
    });
    console.log(newLinks);
  }, [links]);

  const reorder = (sourceIndex, destinationIndex) => {
    setLinks(
      produce(links, (draft) => {
        const [removed] = draft.splice(sourceIndex, 1);
        draft.splice(destinationIndex, 0, removed);
      })
    );
  };
  const onDragEnd = (result) => {
    console.log("called");
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
          <Stack direction="row" mt="8">
            <Button
              backgroundColor="#08bd80"
              colorScheme="green"
              color="white"
              size="lg"
              w="70%"
              onClick={() => setIsDrawer(true)}
            >
              Add Link
            </Button>
            <Button backgroundColor="white" size="lg" w="30%">
              + Title
            </Button>
          </Stack>
          <Heading pt="20px" size="lg">
            My links
          </Heading>
          <DragDropContext onDragEnd={onDragEnd}>
            {
              <Droppable droppableId="droppable">
                {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef}>
                    {links.map((item, i) => (
                      <LinkItem
                        item={item}
                        key={item.id}
                        index={i}
                        setIsDrawer={setIsDrawer}
                      />
                    ))}
                  </Box>
                )}
              </Droppable>
            }
          </DragDropContext>
        </Stack>
        <DrawerMain isDrawer={isDrawer} setIsDrawer={setIsDrawer}>
          <Stack spacing="10px">
            <Input placeholder="Title" />
            <Input placeholder="Link" />
            <Button
              style={{ marginTop: "20px", marginBottom: "15px" }}
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
            >
              Save
            </Button>
          </Stack>
        </DrawerMain>
        <DrawerMain isDrawer={isDrawer} setIsDrawer={setIsDrawer}>
          <Stack spacing="10px">
            <Input placeholder="Title" />
            <Input placeholder="Link" />
            <Button
              style={{ marginTop: "20px", marginBottom: "15px" }}
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
            >
              Save
            </Button>
          </Stack>
        </DrawerMain>
        <BottomNavigationMenu />
      </div>
    </>
  );
};

export default Links;
