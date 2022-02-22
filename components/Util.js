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

// create a function to get a value from local storage and return it if the window is not undefined
export function getLocalStorage(key) {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
}

// create a function to check if the window defined than to set a value in the local storage

export function setLocalStorage(key, value) {
  // check if the window is defined
  if (typeof window !== "undefined") {
    // set the value in the local storage
    localStorage.setItem(key, value.toString().trim());
  }
}
// create a function to check if the window defined than to remove a value in the local storage
export function removeLocalStorage(key) {
  // check if the window is defined
  if (typeof window !== "undefined") {
    // remove the value in the local storage
    localStorage.removeItem(key);
  }
}
