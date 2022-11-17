import Head from "next/head";
import connectToDatabase from "../util/mongodb";
import Main from "../components/Main";
import { MySkeletons } from "../components/MySkeletons";

export default function Home({ todo, done, notDone }) {
  if (!todo) return <MySkeletons />;

  return (
    <>
      <Head>
        <title>Just Do It </title>
      </Head>

      <Main data={todo} done={done} notDone={notDone} />
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
  const done = await db.collection("todo").countDocuments({ isDone: true });

  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/error",
      },
    };
  }
  const todo = await JSON.parse(JSON.stringify(data));

  const notDone = todo.length - done;

  return {
    props: {
      todo,
      done,
      notDone,
    },
    revalidate: 5,
  };
}
