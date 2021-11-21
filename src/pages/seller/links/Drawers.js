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
import { deleteLinkAPI, updateLinkAPI } from "../../../api/sellerLinksAPI";
import DrawerMain from "../../../components/DrawerMain";

const Drawers = ({
  setIsEditDrawer,
  setIsLinkDrawer,
  isLinkDrawer,
  setLinkNew,
  linkNew,
  linkTypes,
  addNewLink,
  links,
  isTitleDrawer,
  isEditDrawer,
  setSelectedEditLink,
  selectedEditLink,
  setIsTitleDrawer,
  setLinks,
}) => {
  const updateLink = async (link) => {
    await updateLinkAPI({ link });
    setLinks((old) => old.map((l) => (l.id === link.id ? link : l)));
  };

  const deleteLink = async (id) => {
    await deleteLinkAPI(id);
    setLinks((old) => old.filter((l) => l.id !== id));
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

      {/*link edit drawer */}
      <DrawerMain
        isDrawer={isEditDrawer}
        setIsDrawer={setIsEditDrawer}
        title="Edit Link"
        onDrawerClose={() => setSelectedEditLink("")}
      >
        <Stack spacing="10px">
          <p>Type</p>
          <Select
            mb="10px"
            label="Link Type"
            name="linkType"
            value={selectedEditLink.type}
            onChange={(e) => {
              let type = e.target.value;
              setSelectedEditLink((old) => ({ ...old, type }));
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
            value={selectedEditLink?.name}
            onChange={(e) => {
              let name = e.target.value;
              setSelectedEditLink((old) => ({
                ...old,
                name,
              }));
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
          )}
          <Stack direction="row" justify="space-between" padding="10px">
            <IconButton
              icon={<DeleteIcon color="red.500" />}
              onClick={() => deleteLink(selectedEditLink.id)}
            />
            <Button
              colorScheme="blue"
              backgroundColor="#08BD80"
              alignSelf="flex-end"
              w="120px"
              onClick={async () => {
                if (
                  selectedEditLink.type === "SAAV_STORE"
                    ? selectedEditLink.name
                    : selectedEditLink.name && selectedEditLink.url
                ) {
                  await updateLink({
                    ...selectedEditLink,
                  });
                  setIsEditDrawer(false);
                }
              }}
            >
              Save
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
    </>
  );
};

export default Drawers;
