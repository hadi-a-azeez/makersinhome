import { Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Design = () => {
  const [selectedTheme, setSelectedTheme] = useState("");

  const linksThemes = [
    { id: "summer", name: "Summer" },
    { id: "saav_x_nasim", name: "Saav x Nasim" },
    { id: "retro", name: "Retro" },
    { id: "neon_nights", name: "Saav x Ahmed" },
  ];

  return (
    <>
      <Heading pt="20px" size="md" alignSelf="flex-start">
        Theme
      </Heading>
      <Stack direction="row" mb="10px" overflow="auto" whiteSpace="nowrap">
        {linksThemes.map((item) => (
          <Stack
            key={item.id}
            border={
              selectedTheme === item.id ? "3px solid #08BD80" : "1px solid grey"
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
    </>
  );
};

export default Design;
