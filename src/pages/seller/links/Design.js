import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { updateSettings } from "../../../api/sellerAccountAPI";
import { getLinksAPI } from "../../../api/sellerLinksAPI";
import BottomNavigationMenu from "../../../components/bottomNavigation";

const Design = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [userData, setUserData] = useState("");

  const linksThemes = [
    { id: "summer", name: "Summer", image: "https://saav.in/links/summer.jpg" },
    {
      id: "saav_x_nasim",
      name: "Saav x Nasim",
      image: "https://saav.in/links/saav_x_nasim.png",
    },
    { id: "retro", name: "Retro", color: "#F1EDE2" },
    {
      id: "neon_nights",
      name: "Neon Nights",
      image: "https://c.tenor.com/9014ZFGozAcAAAAM/no-sleep.gif",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLinksAPI();
      if (response?.data?.data) {
        response?.data?.data?.user_settings?.links_theme
          ? setSelectedTheme(response?.data?.data?.user_settings?.links_theme)
          : setSelectedTheme("summer");
        setUserData({
          settings: response.data.data?.user_settings,
          info: response.data.data?.account_info,
        });
      }
    };
    fetchData();
  }, []);

  const updateSelectedTheme = async (theme) => {
    await updateSettings({ links_theme: theme });
  };

  return (
    <Box bgColor="#f1f1f1" minHeight="100vh" p="10px">
      <Heading pt="15px" size="md" alignSelf="flex-start" pb="10px">
        Theme
      </Heading>
      <SimpleGrid position="relative" columns={{ sm: 2, lg: 3 }} spacing={3}>
        {linksThemes.map((item) => (
          <Stack
            position="relative"
            border={selectedTheme === item.id ? "4px solid #08BD80" : ""}
            key={item.id}
            borderRadius="5px"
            padding="5px"
            backgroundColor="white"
            h={{ sm: "150px", lg: "300px" }}
            justifyContent="center"
            alignItems="center"
            paddingLeft="10px"
            boxShadow="#fff 0px 2px 8px 0px;"
            paddingRight="10px"
            bg={item.image ? "url(" + item.image + ")" : item.color}
            onClick={async () => {
              setSelectedTheme(item.id);
              await updateSelectedTheme(item.id);
            }}
          >
            <Text>{item.name}</Text>
            {selectedTheme === item.id && (
              <IconButton
                bg="#08BD80"
                icon={<CheckIcon color="#fff" w="100%" />}
                borderRadius="50%"
                position="absolute"
                top="4px"
                left="8px"
              />
            )}
          </Stack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Design;
