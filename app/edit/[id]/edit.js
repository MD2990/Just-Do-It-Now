"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";
import {
  Button,
  VStack,
  Center,
  Textarea,
  Text,
  Wrap,
  Divider,
} from "@chakra-ui/react";
import state from "@components/store";
import { useToast } from "@chakra-ui/react";
import { MyToast } from "@components/Util";
import { useSnapshot } from "valtio";

export default function Edit({ todo, id }) {
  const router = useRouter();
  const toast = useToast({});

  const snap = useSnapshot(state);

  const handleSubmit = async (e) => {
    state.isLoading = true;
    e.preventDefault();
    const ip = process.env.NEXT_PUBLIC_VERCEL_URL;

    try {
      await fetch(`${ip}/edit/api?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ name: state.todoName }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          MyToast({ toast: toast, update: true });
          router.refresh();
          router.replace("/");
        } else {
          MyToast({ toast: toast, error: true });
        }
      });
    } catch (error) {
      MyToast({ toast: toast, error: true });
    } finally {
      state.isLoading = false;
    }
  };

  return (
    <Center
      mt={["4vh", "5vh", "8vh", "10vh"]}
      p={[2, 4, 8, 10]}
      mx={[2, 4, 8, 10]}
    >
      <VStack align="center" justify="center" p="2">
        <Text
          shadow="sm"
          noOfLines={1}
          textTransform="capitalize"
          fontSize={["sm", "lg", "2xl", "4xl"]}
          fontWeight="bold"
          color="teal.300"
          textAlign="center"
        >
          {todo?.name?.length > 10
            ? todo?.name.slice(0, 10) + "..."
            : todo?.name}
        </Text>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Textarea
            focusBorderColor="teal.300"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={["sm", "md", "lg"]}
            size={["xs", "sm", "md", "lg"]}
            rounded="xl"
            defaultValue={todo?.name}
            isRequired
            shadow="2xl"
            errorBorderColor="red.300"
            onChange={(e) => (state.todoName = e.target.value)}
          />
          <Center>
            <Wrap m="4" justify="center">
              <Button
                isDisabled={snap.todoName?.trim()?.length < 1}
                isLoading={snap.isLoading}
                type="submit"
                shadow="2xl"
                fontSize={["sm", "md", "lg"]}
                size={["xs", "sm", "md", "lg"]}
                rounded="xl"
                colorScheme="teal"
                leftIcon={<FaSave />}
           
              >
                Edit & Save
              </Button>
              <Button
              display={snap.isLoading ? "none" : "block"}
                shadow="2xl"
                fontSize={["sm", "md", "lg"]}
                size={["xs", "sm", "md", "lg"]}
                rounded="xl"
                colorScheme="blackAlpha"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
            </Wrap>
          </Center>
        </form>
      </VStack>
    </Center>
  );
}
