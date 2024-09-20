import { NextResponse } from "next/server";
import Post from "@models/post";
import Comment from "@models/comment";
import User from "@models/user";
import { connectToMongoDB } from "@libs/mongodb";
import mongoose from "mongoose";

export const DELETE = async (req, { params }) => {
  const { postId, commentId } = params;
  await connectToMongoDB();
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { new: true }
    );
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};

export const PATCH = async (req, { params }) => {
  const { postId, commentId } = params;
  const { editedContent } = await req.json();

  await connectToMongoDB();
  try {
    if (typeof editedContent !== "string") {
      throw new Error("Edited content must be a string");
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return NextResponse.json(
        { message: "Comment not found" },
        { status: 404 }
      );
    }
    comment.content = editedContent;
    await comment.save();
    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    // if (commentIndex === -1) {
    //   return NextResponse.json(
    //     { message: "Comment not found in the post" },
    //     { status: 404 }
    //   );
    // }

    post.comments[commentIndex] = comment;
    await post.save();
    return NextResponse.json(
      { message: "Comment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
