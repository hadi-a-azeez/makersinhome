import React, { useState } from "react";

import { Stack, Button, Heading, Image, Text, Box } from "@chakra-ui/react";

import { DragHandleIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";

const LinkItem = ({ index, item, setIsDrawer, setSelectedEditLink }) => {
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <Stack
          spacing="0"
          key={item.id}
          background="white"
          direction="row"
          borderRadius="6px"
          mb="10px"
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          w="100%"
        >
          <Stack
            direction="row"
            alignItems="center"
            minWidth="85%"
            maxWidth="85%"
            onClick={() => {
              setSelectedEditLink(item);
              setIsDrawer(true);
            }}
          >
            {item.image && <Image w="25%" pr="2px" src={item.image} />}
            <Stack
              direction="column"
              spacing="0"
              justifyContent="center"
              w="65%"
              p="15px"
            >
              <Heading
                size={item.type == "HEADING" ? "md" : "sm"}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                fontWeight={item.type == "HEADING" ? "bold" : "medium"}
              >
                {item.name}
              </Heading>
              <Text
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {item.url}
              </Text>
            </Stack>
          </Stack>
          <Box
            {...provided.dragHandleProps}
            w="15%"
            display="grid"
            placeItems="center"
            background="#dedede"
            borderRadius="0px 6px 6px 0px"
          >
            <DragHandleIcon boxSize="20px" />
          </Box>
        </Stack>
      )}
    </Draggable>
  );
};

export default LinkItem;
