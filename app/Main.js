"use client";
import { Box, Center, Text, Wrap, VStack, HStack } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { FcOk, FcSportsMode, FcTodoList } from "react-icons/fc";
import { useSnapshot } from "valtio";
import { colors } from "@lib/constent";
import AddTodo from "@components/AddTodo";
import { Boxes } from "@components/Boxes";
import ShowTodo from "@components/ShowTodo";
import state from "@components/store";

export default function Main({
  allTodos,
  doneNumber,
  notDoneNumber,
  notDoneTodos,
  doneTodos,
}) {
  const size = "5rem";
  const Font_Size = ["md", "lg", "3xl", "4xl", "5xl"];
  const snap = useSnapshot(state);

  const done = useCallback(() => {
    getDone();
  }, []);
  const notDone = useCallback(() => {
    getNotDone();
  }, []);

  useEffect(() => {
    // save todos from server
    state.allTodos = allTodos || [];
    state.allData = allTodos || [];
    // save todos from server
    state.notDoneTodos = notDoneTodos || 0;
    // save todos from server
    state.doneTodos = doneTodos || 0;

    // get done todos

    // save a copy of todos to return back when user click  all todos button and also when change filter
  }, [allTodos, doneNumber, doneTodos, notDoneNumber, notDoneTodos]);

  return (
    <Center m="4" p="4">
      <VStack>
        <HStack p="2" m="2" mb="-4%" justify={"center"} align={"center"}>
          <Text
            p="2"
            m="2"
            textShadow={`0px 0px 8px  green`}
            noOfLines={1}
            as="span"
            fontSize={Font_Size}
            fontWeight="bold"
            color={colors.green}
          >
            Just Do It
          </Text>
        </HStack>

        <AddTodo />

        {state.allData.length && (
          <Wrap justify="center">
            <Boxes
              color="blue.300"
              onClick={() => {
                state.allTodos = state.allData;
              }}
            >
              <FcTodoList size={size} />

              <Text>{snap.allData.length}</Text>
            </Boxes>
            {doneLength(snap) ? (
              <Boxes
                done
                onClick={() => {
                  done();
                }}
              >
                <FcOk size={size} />
                <Text>{doneLength(snap)}</Text>
              </Boxes>
            ) : null}

            {notDoneLength(snap) ? (
              <Boxes
                notDone
                onClick={() => {
                  notDone();
                }}
              >
                <FcSportsMode size={size} />
                <Text>{notDoneLength(snap)}</Text>
              </Boxes>
            ) : null}
          </Wrap>
        )}

        {!snap.allData.length && (
          <Box p={[1, 2, 3, 4]} rounded={"md"} userSelect={"none"}>
            <Text
              fontWeight="bold"
              fontFamily="body"
              fontSize={[8, 20, 35, 40]}
              align="center"
              textAlign="center"
              color="green.400"
              textShadow="0px 0px 80px  green"
              noOfLines={1}
            >
              <Text as="span" fontSize={[10, 40, 65, 75]}>
                Be
              </Text>
              {"   "}
              Proactive and add some todos to your list and achieve your goals
            </Text>
          </Box>
        )}

        <ShowTodo />
      </VStack>
    </Center>
  );
}

const getDone = () => (state.allTodos = state.allData.filter((t) => t.isDone));

const getNotDone = () =>
  (state.allTodos = state.allData.filter((t) => !t.isDone));
function doneLength(snap) {
  return snap.allData.filter((t) => t.isDone).length;
}
function notDoneLength(snap) {
  return snap.allData.filter((t) => !t.isDone).length;
}
