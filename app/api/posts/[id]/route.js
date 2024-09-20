import { connectToMongoDB } from "@libs/mongodb";
import { NextResponse } from "next/server";
import Post from "@models/post";
import Comment from "@models/comment";

// DELETION USING PARAMS

export async function DELETE(request, { params }) {
  try {
    await connectToMongoDB();
    const { id } = params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    await Comment.deleteMany({ postId: id });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
}

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connectToMongoDB();
    const post = await Post.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "email",
        },
      })
      .populate("creator");
    if (!post)
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { title, summary, content, explanation } = await request.json();
  const { id } = params;
  try {
    await connectToMongoDB();
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return NextResponse.json({ message: "Post not found." }, { status: 404 });
    }
    existingPost.title = title;
    existingPost.content = content;
    existingPost.summary = summary;
    existingPost.explanation = explanation;

    await existingPost.save();

    return NextResponse.json({ existingPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 }
    );
  }
};
