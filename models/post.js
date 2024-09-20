import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  content: {
    type: String,
    required: [true, "Post content is required."],
  },
  summary: {
    type: String,
    required: [true, "Summary is required."],
  },
  explanation: {
    type: String,
    required: [true, "Explanation is required."],
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;

// image: {
//   type: String,
// },
