import React, { useState, useEffect } from "react";
import styles from "../css/products.module.css";
import { useHistory } from "react-router-dom";
import {
  Stack,
  Button,
  Heading,
  Box,
  Input,
  InputRightElement,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import LabelHeader from "../../../components/labelHeader";
import BottomNavigationMenu from "../../../components/bottomNavigation";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { produce } from "immer";
import LinkItem from "../../../components/LinkItem";
import DrawerMain from "../../../components/DrawerMain";
import {
  addLink,
  getLinksAPI,
  reorderLinks,
} from "../../../api/sellerLinksAPI";

const Links = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkDrawer, setIsLinkDrawer] = useState(false);
  const [isTitleDrawer, setIsTitleDrawer] = useState(false);

  const [linkNew, setLinkNeww] = useState({
    name: "",
    url: "",
    type: "LINK",
  });
  const [links, setLinks] = useState([]);

  let history = useHistory();

  const setLinkNew = (val) => {
    console.log(val);
    setLinkNeww(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getLinksAPI();
      if (response.data.data) setLinks(response.data.data);
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
    const response = await reorderLinks({
      links: newLinks,
    });
  };

  const linkTypes = [
    {
      name: "Link",
      value: "LINK",
      placeholder: "https://www.example.com",
    },
    {
      name: "Message Whatsapp",
      value: "MESSAGE_WHATSAPP",
      placeholder: "Whatsapp Number",
      type: "number",
      defaultTitle: "Message On Whatsapp",
    },
    {
      name: "Call Mobile",
      value: "CALL_MOBILE",
      placeholder: "Mobile Number",
      type: "number",
      defaultTitle: "Call On Mobile",
    },
    {
      name: "Saav Store",
      value: "SAAV_STORE",
      defaultTitle: "Shop Our Products",
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
          <Heading pt="20px" size="lg">
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
                    {links?.map((item, i) => (
                      <LinkItem
                        item={item}
                        key={item.id}
                        index={i}
                        setIsDrawer={setIsLinkDrawer}
                      />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            }
          </DragDropContext>
        </Stack>
        <DrawerMain
          isDrawer={isLinkDrawer}
          setIsDrawer={setIsLinkDrawer}
          title="Add New Link"
          onDrawerClose={() => setLinkNew({ name: "", url: "", type: "LINK" })}
        >
          <Stack spacing="10px">
            <p>Type</p>
            <Select
              mb="10px"
              label="Link Type"
              name="linkType"
              value={linkNew.type}
              onChange={(e) => {
                setLinkNew({
                  ...linkNew,
                  name: linkTypes.find((type) => type.value === e.target.value)
                    ?.defaultTitle,
                  type: e.target.value,
                });
              }}
            >
              {linkTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Title"
              value={linkNew.name}
              onChange={(e) => {
                let name = e.target.value;
                setLinkNew((old) => ({ ...old, name }));
              }}
            />
            {linkNew?.type !== "SAAV_STORE" && (
              <InputGroup size="lg">
                <Input
                  pr="30%"
                  size="lg"
                  placeholder={
                    linkTypes.find((item) => item.value === linkNew.type)
                      ?.placeholder
                  }
                  value={linkNew.url}
                  onChange={(e) => {
                    let url = e.target.value;
                    setLinkNew((old) => ({ ...old, url }));
                  }}
                />
                <InputRightElement width="30%">
                  <Button
                    size="sm"
                    onClick={async () => {
                      let url = await navigator.clipboard.readText();
                      setLinkNew((old) => ({ ...old, url }));
                    }}
                  >
                    Paste
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
            <Button
              style={{ marginTop: "20px", marginBottom: "15px" }}
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
              onClick={() => {
                linkNew.name &&
                  linkNew.url &&
                  addNewLink({
                    position:
                      links.length > 0 ? links.length + 2 : links.length + 1,
                    ...linkNew,
                  });
                setIsLinkDrawer(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </DrawerMain>
        <DrawerMain
          isDrawer={isTitleDrawer}
          setIsDrawer={setIsTitleDrawer}
          title="Add New Title"
          onDrawerClose={() => setLinkNew({ name: "", url: "", type: "LINK" })}
        >
          <Stack spacing="10px">
            <Input
              size="lg"
              placeholder="Heading"
              onChange={(e) => {
                let name = e.target.value;
                setLinkNew((old) => ({ ...old, name }));
              }}
            />

            <Button
              style={{ marginTop: "20px", marginBottom: "15px" }}
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
              onClick={() => {
                linkNew.name &&
                  addNewLink({
                    type: "HEADING",
                    position:
                      links.length > 0 ? links.length + 2 : links.length + 1,
                    name: linkNew.name,
                    url: "",
                  });
                setIsTitleDrawer(false);
              }}
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
