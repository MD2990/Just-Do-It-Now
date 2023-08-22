import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Center, Stack, Wrap, WrapItem } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { useRef } from "react";
import { MdAlarmAdd } from "react-icons/md";
import { useSnapshot } from "valtio";
import { getDate } from "../lib/constent";
import state from "../store";
import { MyToast } from "./Util";
import { useRouter } from "next/navigation";

export default function AddTodo() {
  const snap = useSnapshot(state);
  const ref = useRef("");
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    const ip = process.env.NEXT_PUBLIC_VERCEL_URL;
    e.preventDefault();

    const names = state.newTodo; // get the new todo name before clearing it
    state.newTodo = ""; // rest input

    await fetch(`${ip}/api`, {
      // send the new todo to the server
      // post request
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: names, isDone: false, date: getDate() }),
    })
      .then((res) =>
        res.ok
          ? MyToast({ toast: toast, success: true })
          : MyToast({ toast: toast, error: true })
      )
      .catch(() => MyToast({ toast: toast, error: true }));

    // get the new data from db for ui to UI refresh insanely for best user experience
 
      router.refresh();
  };
  return (
    <Center mt="5%" mb="1%">
      <Wrap justify="center">
        <WrapItem>
          <form onSubmit={handleSubmit}>
            <Input
              focusBorderColor="green.200"
              ref={ref}
              value={snap.newTodo}
              onChange={(e) => {
                state.newTodo = e.target.value;
              }}
              fontSize={["sm", "md", "lg"]}
              size={["xs", "sm", "md", "lg"]}
              rounded="3xl"
              textAlign="center"
              isRequired
              errorBorderColor="green.200"
              placeholder="Add New Todo"
            />
            <Stack>
              <Button
                disabled={snap.newTodo === ""}
                mt="2"
                fontSize={["sm", "md", "2xl"]}
                size={["xs", "sm", "md", "lg"]}
                rounded="lg"
                type="submit"
                colorScheme="teal"
                leftIcon={<MdAlarmAdd />}
              >
                Add
              </Button>
            </Stack>
          </form>
        </WrapItem>
      </Wrap>
    </Center>
  );
}
