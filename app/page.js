import React from "react";
import Main from "./Main";
import connectToDatabase from "./mongodb";
export const dynamic = "force-dynamic";

async function getData() {
  const { db } = await connectToDatabase();

  const data = await db
    .collection("todo")
    .find({})
    .sort({ date: -1 })
    .toArray();

  const allTodos = (await JSON.parse(JSON.stringify(data))) || [];

  const doneNumber = await db
    .collection("todo")
    .countDocuments({ isDone: true });
  const notDoneTodos = allTodos.filter((todo) => !todo.isDone) || [];
  const doneTodos = allTodos.filter((todo) => todo.isDone) || [];

  const notDoneNumber = allTodos.length - doneNumber || 0;

  return {
    allTodos,
    doneNumber,
    notDoneNumber,
    notDoneTodos,
    doneTodos,
  };
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
