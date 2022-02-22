import React from "react";
import { useRouter } from "next/router";
import { FaSave } from "react-icons/fa";

import {
  Button,
  VStack,
  Center,
  Input,
  Text,
  Wrap,
  Divider,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/ri";
import state from "../../store";
import { useToast } from "@chakra-ui/toast";

import { useSnapshot } from "valtio";
import {
  getLocalStorage,
  MyToast,
  removeLocalStorage,
} from "../../components/Util";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast({});

  const snapshot = useSnapshot(state);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = state.todoName;

    try {
      await fetch("/api/updateTodo?_id=" + id, {
        method: "PUT",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          MyToast({ toast: toast, update: true });
          removeLocalStorage(id);
          router.back();
        } else {
           MyToast({ toast: toast, error: true });
        }
      });
    } catch (error) {
      MyToast({ toast: toast, error: true });
    }
  };

  return (
    <Center
      mt={["4vh", "5vh", "8vh", "10vh"]}
      p={[2, 4, 8, 10]}
      mx={[2, 4, 8, 10]}
    >
      <VStack align="center" justify="center" spacing={[2, 4, 6, 8]}>
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          shadow="sm"
          p="4"
          textTransform="capitalize"
          letterSpacing="wide"
          fontSize="2xl"
          fontWeight="bold"
          color="teal.300"
          mb="10%"
          textAlign="center"
        >
          {snapshot.todoName}
        </Text>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Input
            isTruncated
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize="1.2rem"
            rounded="full"
            textAlign="center"
            size="lg"
            defaultValue={
              snapshot.todoName ||
              getLocalStorage(id) 
              
            }
            isRequired
            shadow="2xl"
            errorBorderColor="teal.300"
            onChange={(e) => (state.todoName = e.target.value)}
          />
          <Center>
            <Wrap m="4" justify="center">
              <Button
                isDisabled={snapshot.todoName.length < 1}
                type="submit"
                shadow="2xl"
                fontSize="1.2rem"
                size="lg"
                rounded="full"
                colorScheme="teal"
                leftIcon={<FaSave fontSize="2.1rem" />}
              >
                Edit & Save
              </Button>

              <Button
                shadow="2xl"
                fontSize="1.2rem"
                size="lg"
                rounded="full"
                colorScheme="teal"
                leftIcon={<RiArrowGoBackLine fontSize="2.1rem" />}
                onClick={() => {
                     removeLocalStorage(id);
                  router.back();}}
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
