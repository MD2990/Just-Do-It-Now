import {
  Box,
  Center,
  Text,
  Wrap,
  WrapItem,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FcOk, FcSportsMode, FcTodoList } from "react-icons/fc";
import { useSnapshot } from "valtio";
import state from "../store";
import { colors } from "../lib/constent";
import AddTodo from "./AddTodo";
import ShowTodo from "./ShowTodo";
import { useBreakpointValue } from "@chakra-ui/media-query";

const Boxes = ({ children, notDone, done, filter }) => (
  <WrapItem onClick={filter} cursor="pointer">
    <Box
      p={[1, 2, 3, 4]}
      isTruncated
      borderRadius="3xl"
      shadow="lg"
      textAlign="center"
      fontSize={["lg", "2xl", "3xl", "4xl"]}
      fontFamily="sans"
      fontWeight="bold"
      color={notDone ? "red.400" : done ? "green.400" : "blue.300"}
    >
      {children}
    </Box>
  </WrapItem>
);

export default function Main({ data }) {
  const size = "5rem";
  const Font_Size = () =>
    useBreakpointValue({ base: "3xl", lg: "9xl", md: "7xl", sm: "5xl" });
  const snap = useSnapshot(state);

  useEffect(() => {
    // save todos from server
    state.todos = data.data;

    // get done todos
    state.doneNumber = data.data.filter((t) => t.isDone).length;

    // get not done todos
    state.notDoneNumber = data.data.filter((t) => !t.isDone).length;

    // get total todos
    state.total = data.data.length;

    // save a copy of todos to return back when user click  all todos button and also when change filter
    state.allTodos = state.todos;
  }, [data.data]);

  return (
    <Center m="4" p="4">
      <VStack>
        <HStack>
          <Text
            as="span"
            fontSize={Font_Size}
            transform="rotate(-20deg)"
            fontWeight="bold"
            color={colors.green}
          >
            J
          </Text>
          <Text
            mb="1"
            ml="0.9%"
            letterSpacing="wider"
            fontSize={["md", "lg", "3xl", "4xl"]}
            fontWeight="bold"
            color={colors.green}
            textOverflow="ellipsis"
            isTruncated
            fontFamily="sans-serif"
          >
            UST DO I
          </Text>
          <Text
            as="span"
            fontSize={Font_Size}
            transform="rotate(20deg)"
            fontWeight="bold"
            color={colors.green}
          >
            T
          </Text>
        </HStack>

        <AddTodo />

        {state.allTodos.length && (
          <Wrap justify="center">
            <Boxes
              filter={() => {
                state.todos = state.allTodos;
              }}
            >
              <FcTodoList size={size} />
              {state.total}
            </Boxes>

            {snap.doneNumber > 0 && (
              <Boxes
                done
                filter={() => {
                  state.todos = state.allTodos;
                  state.todos = state.todos.filter((t) => t.isDone);
            
                }}
              >
                <FcOk size={size} />
                {snap.doneNumber}
              </Boxes>
            )}

            {snap.notDoneNumber > 0 && (
              <Boxes
                notDone
                filter={() => {
                  // clear allTodos filter
                  state.todos = state.allTodos;

                  // filter notDone
                  state.todos = state.todos.filter((t) => !t.isDone);
                 
                }}
              >
                <FcSportsMode size={size} />
                {snap.notDoneNumber}
              </Boxes>
            )}
          </Wrap>
        )}

        {!snap.allTodos.length && (
          <Box pt="8">
            <Text
              fontWeight="bold"
              fontFamily="body"
              fontSize={[10, 20, 35, 40]}
              align="center"
              isTruncated
              textOverflow="ellipsis"
              overflow="hidden"
              textAlign="center"
              color="green.400"
              textShadow="0px 0px 80px  green"
              whiteSpace="nowrap"
              p="2"
            >
              <Text
                as="span"
                fontSize={[30, 40, 65, 90]}
                transform="rotate(-200deg)"
              >
                Be
              </Text>
              {"   "}
              Proactive and add some todos to your list{" "}
            </Text>
          </Box>
        )}

        <ShowTodo />
      </VStack>
    </Center>
  );
}

// text rotate(20deg)
