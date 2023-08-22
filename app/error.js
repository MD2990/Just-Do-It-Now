"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Text, Center } from "@chakra-ui/react";
export default function Error() {
  const router = useRouter();
  return (
    <Center
      mt="20%"
      p="4"
      mx="4"
      onClick={() => router.replace("/")}
      cursor="pointer"
    >
      <Text
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
        Something went wrong, click to go back to home page !
      </Text>
    </Center>
  );
}
