import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useRouter } from "next/router";
import React from "react";
import { FcAlarmClock, FcCheckmark } from "react-icons/fc";
import { useSnapshot } from "valtio";
import { colors } from "../lib/constent";
import state from "../store";

export default function ShowTodo() {
  const Box_Font_Size = useBreakpointValue({
    base: "xl",
    lg: "3xl",
    md: "md",
    sm: "sm",
  });
  const router = useRouter();
  const snap = useSnapshot(state);

  return (
    <Wrap justify="center" spacing="4" >
      {snap.todos.map((todo, index) => {
        return (
          <WrapItem key={todo._id}>
            <Box
              p="4"
              textAlign="center"
              maxW="fit-content"
              w={"full"}
              bg={"white"}
              boxShadow={"2xl"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Box
                borderRadius="lg"
                shadow="lg"
                bgGradient={`linear(to-r,${colors.green} , ${colors.blue})`}
                w="full"
                h="20"
              ></Box>
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  _hover={{
                    transform: "translateY(-8px) ",
                    transition: "all 0.4s ease-in-out ",
                    boxShadow: "lg",
                  }}
                  cursor="pointer"
                  p="3"
                  bg="whitesmoke"
                  size={"xl"}
                  onClick={async () => {
                    const done = (state.todos[index].isDone = !todo.isDone);

                    await fetch("/api/doneTodo?_id=" + todo._id, {
                      method: "PUT",
                      body: JSON.stringify({ isDone: done }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }).then((response) => response.json());
                  }}
                  icon={
                    todo.isDone ? (
                      <FcCheckmark fontSize="5.5rem" />
                    ) : (
                      <FcAlarmClock fontSize="5.5rem" />
                    )
                  }
                  alt={"Todo"}
                />
              </Flex>

              <Center>
                <Heading
                  isTruncated
                  textOverflow="ellipsis"
                  overflow="hidden"
                  maxW="20rem"
                  minW="10rem"
                  fontSize={Box_Font_Size}
                  fontWeight={500}
                  textDecor={todo.isDone && "line-through green"}
                  color={todo.isDone ? "green" : "gray.500"}
                  textShadow={
                    todo.isDone ? "0px 0px 3px green" : "0px 0px 5px gray"
                  }
                >
                  {todo.name}
                </Heading>
              </Center>
              <Center>
                <HStack spacing="2" p="4" maxW="20rem">
                  <Button
                    w={"full"}
                    bg={"tomato"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={async () => {
                      state.todos = state.todos.filter(
                        (to) => todo._id !== to._id
                      );

                      await fetch("/api/delTodo", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(todo._id),
                      });
                      const getData = await fetch("/api/todos").then(
                        (response) => response.json()
                      );

                      state.todos = getData.data;
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    w={"full"}
                    bg={"blackAlpha.500"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={() => router.push(`/edit/${todo._id}`)}
                  >
                    Edit
                  </Button>
                </HStack>
              </Center>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
