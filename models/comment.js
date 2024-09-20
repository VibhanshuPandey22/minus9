import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "Comment cannot be empty."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model("Comment", CommentSchema);
export default Comment;
