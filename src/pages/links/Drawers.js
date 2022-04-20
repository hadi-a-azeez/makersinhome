import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { deleteLinkAPI, updateLinkAPI } from "../../api/sellerLinksAPI";
import DrawerMain from "../../components/DrawerMain";

const Drawers = ({
  setIsEditDrawer,
  setIsLinkDrawer,
  isLinkDrawer,
  setLinkNew,
  linkNew,
  addNewLink,
  links,
  isTitleDrawer,
  isEditDrawer,
  setSelectedEditLink,
  selectedEditLink,
  setIsTitleDrawer,
  setLinks,
  setIsLoading,
  isLoading,
  userData,
}) => {
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

  const updateLink = async (link) => {
    await updateLinkAPI({ link });
    setLinks((old) => old.map((l) => (l.id === link.id ? link : l)));
  };

  const deleteLink = async (id) => {
    setIsLoading("DELETE_LINK");
    await deleteLinkAPI(id);
    setLinks((old) => old.filter((l) => l.id !== id));
    setIsLoading("");
    setIsEditDrawer(false);
  };

  return (
    <>
      {/* link add drawer */}
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
              let type = e.target.value;
              setLinkNew({
                ...linkNew,
                name: linkTypes.find((item) => item.value === type)
                  ?.defaultTitle,
                type,
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
            isLoading={isLoading === "ADD_LINK"}
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
                setIsLoading("ADD_LINK");
                addNewLink({
                  position:
                    links.length > 0 ? links.length + 2 : links.length + 1,
                  ...linkNew,
                });
                setIsLoading("");
                setIsLinkDrawer(false);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </DrawerMain>

      {/*link edit drawer */}
      <DrawerMain
        isDrawer={isEditDrawer}
        setIsDrawer={setIsEditDrawer}
        title="Edit Link"
        onDrawerClose={() => setSelectedEditLink("")}
      >
        <Stack spacing="10px">
          <Input
            placeholder="Title"
            value={selectedEditLink?.name}
            onChange={(e) => {
              let name = e.target.value;
              setSelectedEditLink((old) => ({
                ...old,
                name,
              }));
            }}
          />
          {selectedEditLink?.type !== "SAAV_STORE" ||
            (selectedEditLink?.type === "HEADING" && (
              <InputGroup size="lg">
                <Input
                  pr="30%"
                  size="lg"
                  placeholder={
                    linkTypes.find((item) => item.value === linkNew.type)
                      ?.placeholder
                  }
                  value={selectedEditLink.url}
                  onChange={(e) => {
                    let url = e.target.value;
                    setSelectedEditLink((old) => ({
                      ...old,
                      url,
                    }));
                  }}
                />
                <InputRightElement width="30%">
                  <Button
                    size="sm"
                    onClick={async () => {
                      let url = await navigator.clipboard.readText();
                      setSelectedEditLink((old) => ({ ...old, url }));
                    }}
                  >
                    Paste
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}
          <Stack direction="row" justify="space-between" padding="10px">
            <IconButton
              isLoading={isLoading === "DELETE_LINK"}
              icon={<DeleteIcon color="red.500" />}
              onClick={() => deleteLink(selectedEditLink.id)}
            />
            <Button
              isLoading={isLoading === "UPDATE_LINK"}
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
              onClick={async () => {
                if (
                  selectedEditLink.type === "SAAV_STORE" ||
                  selectedEditLink.type === "HEADING"
                    ? selectedEditLink.name
                    : selectedEditLink.name && selectedEditLink.url
                ) {
                  setIsLoading("UPDATE_LINK");
                  await updateLink({
                    ...selectedEditLink,
                  });
                  setIsLoading(null);
                  setIsEditDrawer(false);
                }
              }}
            >
              Update
            </Button>
          </Stack>
        </Stack>
      </DrawerMain>

      {/* title add drawer */}
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
            isLoading={isLoading === "ADD_TITLE"}
            style={{ marginTop: "20px", marginBottom: "15px" }}
            colorScheme="blue"
            backgroundColor="#08BD80"
            alignSelf="flex-end"
            w="120px"
            onClick={async () => {
              if (linkNew.name) {
                setIsLoading("ADD_TITLE");
                await addNewLink({
                  type: "HEADING",
                  position:
                    links.length > 0 ? links.length + 2 : links.length + 1,
                  name: linkNew.name,
                  url: "",
                });
                setIsLoading(null);
                setIsTitleDrawer(false);
              }
            }}
          >
            Save
          </Button>
        </Stack>
      </DrawerMain>
    </>
  );
};

export default Drawers;
