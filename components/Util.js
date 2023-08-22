import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import React from "react";



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





