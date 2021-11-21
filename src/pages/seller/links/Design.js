import { Heading, Stack, Text, Box, SimpleGrid } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { updateSettings } from "../../../api/sellerAccountAPI";
import { getLinksAPI } from "../../../api/sellerLinksAPI";
import BottomNavigationMenu from "../../../components/bottomNavigation";

const Design = () => {
  const [selectedTheme, setSelectedTheme] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const linksThemes = [
    { id: "summer", name: "Summer" },
    { id: "saav_x_nasim", name: "Saav x Nasim" },
    { id: "retro", name: "Retro" },
    { id: "neon_nights", name: "Saav x Ahmed" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getLinksAPI();
      if (response.data.data) {
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

  const updateSelectedTheme = async (theme) => {
    await updateSettings({ links_theme: theme });
  };

  return (
    <Box bgColor="#f1f1f1" minHeight="100vh" p="10px">
      <Heading pt="15px" size="md" alignSelf="flex-start" pb="10px">
        Theme
      </Heading>
      <SimpleGrid position="relative" columns={2} spacing={3}>
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
      </SimpleGrid>
      <BottomNavigationMenu />
    </Box>
  );
};

export default Design;
