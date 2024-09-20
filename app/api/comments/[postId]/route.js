import { connectToMongoDB } from "@libs/mongodb";
import Comment from "@models/comment";
import Post from "@models/post";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  const { postId } = params;
  const { userId, content } = await req.json();

  try {
    await connectToMongoDB();
    const comment = await Comment.create({ postId, userId, content });

    // Add the comment to the post's comments array
    await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment._id },
      },
      { new: true }
    );

    const populatedComment = await Comment.findById(comment._id).populate(
      "userId"
    );

    return NextResponse.json(populatedComment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to submit comment" },
      { status: 500 }
    );
  }
};
