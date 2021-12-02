import Head from "next/head";
import connectToDatabase from "../util/mongodb";
import Main from "../components/Main";
import useSWR from "swr";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TheLoader, { Error } from "../components/Util";
import { sortBy } from "../lib/constent";

export default function Home({ todo }) {
  const { data, error } = useSWR("/api/todos", {
    initialData: todo,
    revalidateOnMount: true,
  });
  if (error) return <Error />;
  if (!data) return <TheLoader />;

  sortBy(data.data,'date');
  return (
    <>
      <Head>
        <title>Just Do It </title>
      </Head>

      {!todo ? <TheLoader /> : <Main data={data} />}
    </>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("todo").find({}).toArray();
  const todo = await JSON.parse(JSON.stringify(data));

  return {
    props: {
      todo,
    },
    revalidate: 1,
  };
}
