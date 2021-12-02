import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { FaSave } from "react-icons/fa";

import {
  Button,
  VStack,
  Center,
  Input,
  Text,
  HStack,
  Wrap,
  Box,
  Divider,
} from "@chakra-ui/react";
import { RiArrowGoBackLine } from "react-icons/ri";
import connectToDatabase from "../../util/mongodb";
import Loader from "react-loader-spinner";
import useSWR from "swr";
import state from "../../store";
import { useToast } from "@chakra-ui/toast";

import { useSnapshot } from "valtio";
import TheLoader, { Error, MyToast } from "../../components/Util";
var mongodb = require("mongodb");
export default function Edit({ isConnected }) {
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast({});

  const snapshot = useSnapshot(state);
  /*   useEffect(() => {
    state.todoName = isConnected ? isConnected.name : "";
  }, [isConnected]); */

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
          router.back();
        } else {
          return MyToast({ toast: toast, error: true });
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
            defaultValue={snapshot.todoName}
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
                onClick={() => router.back()}
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

/* export const getStaticProps = async ({ params }) => {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("todo")
    .findOne({ _id: mongodb.ObjectId(params.id) });
  const isConnected = await JSON.parse(JSON.stringify(data));

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isConnected,
    },
    revalidate: 1,
  };
}; */
/* export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const data = await db.collection("todo").find({}).toArray();
  const isConnected = await JSON.parse(JSON.stringify(data));

  const paths = isConnected.map((c) => ({
    params: { id: c._id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
} */

export async function getServerSideProps({ params }) {
  //const client = await connectToDatabase();

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands
  const { db } = await connectToDatabase();
  const data = await db
    .collection("todo")
    .findOne({ _id: mongodb.ObjectId(params.id) });

  const isConnected = JSON.parse(JSON.stringify(data));

  return {
    props: { isConnected },
  };
}
