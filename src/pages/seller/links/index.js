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
  Text,
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
import { updateSettings } from "../../../api/sellerAccountAPI";

const Links = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLinkDrawer, setIsLinkDrawer] = useState(false);
  const [isTitleDrawer, setIsTitleDrawer] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("");

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
    const response = await updateSettings({ links_theme: theme });
  };

  useEffect(() => {
    updateSelectedTheme(selectedTheme);
  }, [selectedTheme]);

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
      formatter: (val) => `https://saav.in/store/${val}`,
    },
  ];

  const addNewLink = async (link) => {
    let url = linkTypes
      .find((item) => item.value === link.type)
      .formatter(link.url);
    const response = await addLink({ link: { ...link, url } });
    setLinks((old) => [...old, response.data.data]);
  };

  const addNewTitle = async (link) => {
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
                onClick={() => {
                  setSelectedTheme(item.id);
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
                if (
                  linkNew.type === "SAAV_STORE"
                    ? linkNew.name
                    : linkNew.name && linkNew.url
                ) {
                  addNewLink({
                    position:
                      links.length > 0 ? links.length + 2 : links.length + 1,
                    ...linkNew,
                  });
                  setIsLinkDrawer(false);
                }
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
                  addNewTitle({
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
