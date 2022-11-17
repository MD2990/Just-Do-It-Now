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
  Text,
} from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React from "react";
import { FcAlarmClock, FcCheckmark } from "react-icons/fc";
import { useSnapshot } from "valtio";
import { colors } from "../lib/constent";
import state from "../store";
import { MyToast } from "./Util";

export default function ShowTodo() {
  const Box_Font_Size = useBreakpointValue({
    base: "xl",
    lg: "3xl",
    md: "md",
    sm: "sm",
  });
  const router = useRouter();
  const snap = useSnapshot(state);
  const toast = useToast();

  return (
    <Wrap justify="center" spacing="4">
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

                    if (!todo.isDone) {
                      state.doneNumber++;
                      state.notDoneNumber--;
                      state.todos = state.todos.filter((t) => !t.isDone);

                      // if all are done,so we will show all with no filter
                      if (state.todos.length === 0)
                        state.todos = state.allTodos;
                    } else {
                      state.doneNumber--;
                      state.notDoneNumber++;
                      state.todos = state.todos.filter((t) => t.isDone);
                      // if all are done,so we will show all with no filter
                      if (state.todos.length === 0)
                        state.todos = state.allTodos;
                    }

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
                  alt={todo.name}
                />
              </Flex>

              <Center>
                <Heading
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
                    fontSize={["xs", "sm"]}
                    size={["xs", "sm"]}
                    w={"full"}
                    bg={"red.400"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={async () => {
                      handelDelete(todo);
                    }}
                  >
                    Delete
                  </Button>

                  <Button
                    fontSize={["xs", "sm"]}
                    size={["xs", "sm"]}
                    w={"full"}
                    bg={"gray.500"}
                    color={"white"}
                    rounded={"full"}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                    onClick={handelEdit(todo, router)}
                  >
                    Edit
                  </Button>
                </HStack>
              </Center>
              <Text
                fontSize={["xx-small", "xs", "sm", "md"]}
                color={todo.isDone ? "green" : "gray.500"}
                fontWeight="semi-bold"
                textShadow={
                  todo.isDone ? "0px 0px 6px #90EE90" : "0px 0px 10px #A9A9A9"
                }
              >
                {todo.date}
              </Text>
            </Box>
          </WrapItem>
        );
      })}
    </Wrap>
  );

  function handelDelete(todo) {
    state.todos = state.todos.filter((to) => todo._id !== to._id);

    // filter todo List for a copy
    state.allTodos = state.allTodos.filter((to) => todo._id !== to._id);

    // if will not check the length the filter will return empty UI when a filter is applied and we delete the last todo
    // now if we delete the last done todo the UI will jump to the undone todo list and vice versa
    // and if empty the UI will jump to the "Proactive and add some todos to your list " as simple msg
    state.todos.length < 1 && (state.todos = state.allTodos);

    // just for user experience and not  do some hard work here
    state.total--;
    // subtract the todo from the total of done todo if user delete  the done todo
    if (!todo.isDone) {
      state.notDoneNumber--;
    } else {
      // subtract the todo from the total of undone todo if user delete  the undone todo
      state.doneNumber--;
    }

    fetch("/api/delTodo", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo._id),
    })
      .then((response) => {
        if (response.ok) {
          MyToast({ toast: toast, deleted: true });
        } else {
          MyToast({ toast: toast, error: true });
          // we must cancel the applied filter for UI and for a copy
          state.todos = state.todos.filter((to) => to._id !== null);
          state.allTodos = state.allTodos.filter((to) => to._id !== null);
        }
      })
      .catch((error) => {
        MyToast({ toast: toast, error: true });
        // we must cancel the applied filter for UI and for a copy
        state.todos = state.todos.filter((to) => to._id !== null);
        state.allTodos = state.allTodos.filter((to) => to._id !== null);
      });
  }
}
function handelEdit(todo, router) {
  return () => {
    state.todoName = todo.name;
    router.push(`/edit/${todo._id}`);
  };
}

