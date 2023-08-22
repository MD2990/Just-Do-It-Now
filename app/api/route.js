import connectToDatabase from "app/mongodb";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { isDone } = await request.json();

    if (typeof isDone === "undefined" || !id)
      return NextResponse.error({ error: "Done is required", status: 400 });

    await db
      .collection("todo")
      .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: { isDone } })

      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ done: true });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}

// Delete todo

export async function DELETE(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.error({ error: "id is required", status: 400 });

    await db
      .collection("todo")
      .deleteOne({ _id: new mongodb.ObjectId(id) })

      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ deleted: true });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}

// Add todo
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const { name, isDone, date } = await request.json();

    if (!name || typeof isDone === "undefined")
      return NextResponse.error({
        error: "name and isDone are required",
        status: 400,
      });

    await db
      .collection("todo")
      .insertOne({ name, isDone, date })

      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ added: true });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}

// Get all todos

export async function GET() {
  try {
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

    return NextResponse.json({
      allTodos,
      doneNumber,
      notDoneNumber,
      notDoneTodos,
      doneTodos,
    });
  } catch (error) {
    return NextResponse.error({ error: error.message, status: 500 });
  }
}
