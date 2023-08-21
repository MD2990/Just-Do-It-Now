import connectToDatabase from "@util/mongodb";
import React from "react";
var mongodb = require("mongodb");
import { redirect } from "next/navigation";
import Edit from "./edit";

async function getById(id) {
  if (!mongodb.ObjectId.isValid(id)) {
    redirect("/");
  }
  const { db } = await connectToDatabase();
  const data = await db
    .collection("todo")
    .findOne(
      { _id: new mongodb.ObjectId(id) },
      { projection: { name: 1, _id: 0 } }
    )
    .catch(() => redirect("/error"));

  if (!data) {
    redirect("/");
  }
  const todo = await JSON.parse(JSON.stringify(data));

  return todo;
}

export default async function Layout({ params }) {
  const { id } = params;
  const todo = await getById(id);

  return <Edit {...{ todo, id }} />;
}
