import React from "react";
import { useRouter } from "next/router";
import { FaSave } from "react-icons/fa";
var mongodb = require("mongodb");
import {
  Button,
  VStack,
  Center,
  Input,
  Text,
  Wrap,
  Divider,
} from "@chakra-ui/react";
import state from "../../store";
import { useToast } from "@chakra-ui/toast";

import { MyToast } from "../../components/Util";
import connectToDatabase from "../../util/mongodb";
import { MySkeletons } from "../../components/MySkeletons";
import { useSnapshot } from "valtio";

export default function Edit({ todo }) {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast({});

  const snap = useSnapshot(state);

  if (!todo?.name) return <MySkeletons />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/updateTodo?_id=" + id, {
        method: "PUT",
        body: JSON.stringify({ name: state.todoName }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          MyToast({ toast: toast, update: true });

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
          {todo?.name}
        </Text>
        <Divider />
        <form onSubmit={handleSubmit}>
          <Input
            focusBorderColor="teal.300"
            textOverflow="ellipsis"
            overflow="hidden"
            fontSize={["sm", "md", "lg"]}
            size={["xs", "sm", "md", "lg"]}
            rounded="xl"
            textAlign="center"
            defaultValue={todo?.name}
            isRequired
            shadow="2xl"
            errorBorderColor="red.300"
            onChange={(e) => (state.todoName = e.target.value)}
          />
          <Center>
            <Wrap m="4" justify="center">
              <Button
                isDisabled={snap.todoName.length < 1}
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

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("todo")
    .findOne({ _id: new mongodb.ObjectId(params.id) });

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  }
  const todo = await JSON.parse(JSON.stringify(data));

  return {
    props: {
      todo,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const data = await db.collection("todo").find({}).toArray();

  const todo = await JSON.parse(JSON.stringify(data));

  const paths = todo.map((c) => ({
    params: { id: c._id.toString() },
  }));
  return { paths, fallback: true };
}
