import { connectToMongoDB } from "@libs/mongodb";
import { NextResponse } from "next/server";
import Post from "@models/post";
import Comment from "@models/comment";

export async function GET() {
  try {
    await connectToMongoDB();
    const allPosts = await Post.find({})
      .populate("comments")
      .populate("creator");
    return NextResponse.json({ allPosts }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Could not fetch all posts" },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  const { creatorId, title, content, summary, explanation } =
    await request.json();
  await connectToMongoDB();
  await Post.create({
    creator: creatorId,
    title,
    content,
    summary,
    explanation,
  });
  return NextResponse.json({ message: "Post created." }, { status: 201 });
}

// DELETION USING QUERY PARAMETERS

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   try {
//     await connectToMongoDB();
//     await Post.findByIdAndDelete(id);
//     return NextResponse.json(
//       { message: "Post successfully Deleted." },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to delete post." },
//       { status: 500 }
//     );
//   }
// }
