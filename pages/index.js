import Head from "next/head";
import connectToDatabase from "../util/mongodb";
import Main from "../components/Main";
import { MySkeletons } from "../components/MySkeletons";

export default function Home({
  allTodos,
  doneNumber,
  notDoneNumber,
  notDoneTodos,
  doneTodos,
}) {
  if (!allTodos) return <MySkeletons />;

  return (
    <>
      <Head>
        <title>Just Do It </title>
      </Head>

      <Main
        allTodos={allTodos}
        doneNumber={doneNumber}
        notDoneNumber={notDoneNumber}
        notDoneTodos={notDoneTodos}
        doneTodos={doneTodos}
      />
    </>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("todo")
    .find({})
    .sort({ date: -1 })
    .toArray();
  const doneNumber = await db
    .collection("todo")
    .countDocuments({ isDone: true });

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  }
  const allTodos = await JSON.parse(JSON.stringify(data));
  const notDoneTodos = allTodos.filter((todo) => !todo.isDone);
  const doneTodos = allTodos.filter((todo) => todo.isDone);

  const notDoneNumber = allTodos.length - doneNumber;

  return {
    props: {
      allTodos,
      doneNumber,
      notDoneNumber,
      notDoneTodos,
      doneTodos,
    },
    revalidate: 5,
  };
}
