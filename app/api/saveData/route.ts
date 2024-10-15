import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// MongoDB connection string
const client = new MongoClient(
  "mongodb+srv://poposhosh23:wUCHV11nbsvptXhi@wheel.k29zi.mongodb.net/wheel"
);

// Async function to handle POST request
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { name, phone, point } = body;

    // Connect to MongoDB
    await client.connect();
    const database = client.db("wheel"); // Database name
    const collection = database.collection("spins"); // Collection name

    // Check if the user already exists by phone number
    const existingUser = await collection.findOne({ phone });

    if (existingUser) {
      return NextResponse.json(
        { message: "لقد قمت بالتسجيل بالفعل." },
        { status: 400 } // 400 إذا كان المستخدم مسجلاً مسبقًا
      );
    }

    // Insert the data into the collection
    const result = await collection.insertOne({ name, phone, point });

    // Return a successful response
    return NextResponse.json(
      { message: "Data saved successfully", result },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response
    return NextResponse.json(
      { message: "Failed to save data", error },
      { status: 500 }
    );
  } finally {
    await client.close(); // Close MongoDB connection
  }
}
