import connectToDatabase from "@util/mongodb";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { name } = await request.json();
    if (!name || name.trim() === "" || !id)
      return NextResponse.error({ error: "name is required", status: 400 });

    await db
      .collection("todo")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { name: name?.trim() } }
      )

      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ done: true });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}
