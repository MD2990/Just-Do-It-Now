import { Box, Center } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";
import { Audio } from "react-loader-spinner";
export default function TheLoader() {
  return (
    <Center mt="20%" p="4" mx="4">
      <Audio height="100" width="100" color="grey" ariaLabel="loading" />
    </Center>
  );
}

export function Error() {
  return (
    <Center mt="20%" p="4" mx="4">
      <Text
        isTruncated
        fontFamily="monospace"
        fontSize={["xs", "sm", "md", "xl", "3xl"]}
        overflowWrap="break-word"
        textAlign="center"
        color="gray.400"
        fontWeight="extrabold"
        userSelect="none"
        textShadow="0 0 15px gray"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        Error loading data from server please try again later ...
      </Text>
    </Center>
  );
}

export function MyToast({
  toast,
  error = false,
  success = false,
  update = false,
  deleted = false,
}) {
  return (
    <>
      {toast({
        duration: 2000,
        position: "bottom",

        render: () => (
          <Box
            rounded="lg"
            color="white"
            p={3}
            bg={error ? "red.500" : "green.500"}
            textAlign="left"
          >
            <Text fontWeight="semi-bold">
              {error && "Something went wrong please try again"}
              {success && "Added successfully"}
              {update && "Updated successfully"}
                {deleted && "Deleted successfully"}
            </Text>
          </Box>
        ),
      })}
    </>
  );
}
