import React from "react";
import Main from "./Main";
async function getData() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`,

    {
      cache: "no-cache",
    }
  );
  const { allTodos, doneNumber, notDoneNumber, notDoneTodos, doneTodos } =
    await data.json();

  return { allTodos, doneNumber, notDoneNumber, notDoneTodos, doneTodos };
}

export default async function page() {
  const { allTodos, doneNumber, notDoneNumber, notDoneTodos, doneTodos } =
    await getData();

  return (
    <Main
      {...{
        allTodos,
        doneNumber,
        notDoneNumber,
        notDoneTodos,
        doneTodos,
      }}
    />
  );
}
