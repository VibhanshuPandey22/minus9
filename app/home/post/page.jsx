"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import DoneIcon from "@mui/icons-material/Done";
import Loading from "@components/Loading";

const Post = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const postId = searchParams.get("id");
  const [postDetails, setPostDetails] = useState({
    title: "",
    content: "",
    summary: "",
    explanation: "",
    time: "",
    author: "",
    comments: [],
  });
  const [showExplanation, setShowExplanation] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const [editCommentContent, setEditCommentContent] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      router.push("/unauthorized");
    } else {
      if (postId) {
        const getPostDetails = async () => {
          try {
            const response = await fetch(`/api/posts/${postId}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const { post } = await response.json();
            setPostDetails({
              title: post.title,
              content: post.content,
              summary: post.summary,
              explanation: post.explanation,
              time: post.createdAt,
              author: post.creator.email,
              comments: post.comments,
            });
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getPostDetails();
      }
    }
  }, [session, status, router, postId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      alert("Please enter a comment before submitting.");
      return;
    }

    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          content: comment,
        }),
      });
      if (response.ok) {
        setComment("");
        const newComment = await response.json();
        setPostDetails((prev) => ({
          ...prev,
          comments: [...prev.comments, newComment],
        }));
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const isConfirmed = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/comments/${postId}/${commentId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPostDetails((prev) => ({
            ...prev,
            comments: prev.comments.filter(
              (comment) => comment._id !== commentId
            ),
          }));
        } else {
          console.log("Error deleting comment.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSaveEdit = async (commentId) => {
    if (editCommentContent.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }

    console.log(commentId);
    console.log(editCommentContent);

    try {
      const response = await fetch(`/api/comments/${postId}/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          editedContent: editCommentContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the comment");
      }

      if (response.ok) {
        const updatedComments = [...postDetails.comments];
        updatedComments[editCommentIndex].content = editCommentContent;
        setPostDetails({
          ...postDetails,
          comments: updatedComments,
        });

        // Reset edit mode
        setEditCommentIndex(-1);
        setEditCommentContent("");
      } else {
        console.error("Error saving edited comment.");
      }
    } catch (error) {
      console.error("Error saving edited comment:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!loading) {
    return (
      <div>
        <div className="flex-center flex-col gap-5 mx-20 max-sm:mx-10">
          <div className="flex-center flex-col gap-[0.35rem]">
            <h1 className="text-cyan font-mukta text-5xl max-sm:text-3xl font-semibold tracking-tighter ">
              {postDetails.title}
            </h1>
            <p className="text-platinum text-sm max-sm:text-xs opacity-70 font-mukta text-center">
              Posted at : {postDetails.time} by {postDetails.author}
            </p>
          </div>
          <div className="text-platinum font-mukta mt-5 px-20 py-10 max-sm:text-xs border-[1px] border-platinum max-sm:px-8 max-sm:py-4">
            <p className="whitespace-pre-wrap break-words">
              {postDetails.content}
            </p>
          </div>
          <div className="flex-center flex-col mt-14 max-sm:mt-8 mb-10">
            {showExplanation ? (
              <p className="whitespace-pre-wrap break-words text-platinum bg-extra font-mukta max-sm:text-xs px-16 py-8  max-sm:px-8 max-sm:py-4">
                <div className=" mb-2 max-sm:mb-1">
                  <span className="text-cyan text-xl max-sm:text-lg font-mukta font-medium">
                    My Understanding :{" "}
                  </span>
                </div>
                <br />
                {postDetails.explanation}
                <div className="flex justify-end mt-10 max-sm:mt-8">
                  <span
                    onClick={() => setShowExplanation(false)}
                    className="text-red-600 hover:text-red-700 transition-all duration-200 cursor-pointer max-sm:text-xs font-mukta font-medium"
                  >
                    Close
                  </span>
                </div>
              </p>
            ) : (
              <span
                className="cursor-pointer font-mukta text-platinum text-2xl max-sm:text-xl font-medium hover:text-cyan transition-all duration-200"
                onClick={() => setShowExplanation(true)}
              >
                Click to read my thoughts
              </span>
            )}
          </div>
        </div>
        <div className="mx-20 max-sm:mx-10">
          <div className="mt-16 max-sm:mt-8">
            <h3 className="text-2xl max-sm:text-xl font-mukta mb-4 text-cyan font-medium">
              Let me know how you feel and make my day !
            </h3>
          </div>
          <form
            onSubmit={handleSubmitComment}
            className="flex-center flex-col gap-3 w-full mt-7"
          >
            <textarea
              className="w-full h-10 p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
              placeholder="Share your thoughts, feedback or anything else..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type="submit"
              className="text-platinum font-mukta font-medium text-lg max-sm:text-sm border-cyan border-[1px] px-3 max-sm:px-2 py-1 rounded-3xl max-sm:rounded-2xl flex-center hover:bg-cyan hover:text-light transition-all duration-150"
            >
              Submit
            </button>
          </form>
          {postDetails.comments.length > 0 ? (
            <div className="flex flex-col">
              <div className="mt-20 max-sm:mt-10 text-2xl max-sm:text-xl font-medium font-mukta mb-4 text-platinum">
                Comments :
              </div>
              <div className="flex flex-col-reverse">
                {postDetails.comments.map((comment, index) => (
                  <div
                    key={comment._id}
                    className="whitespace-pre-wrap break-words flex flex-col gap-3 text-platinum bg-extra max-sm:text-xs px-4 py-2 max-sm:px-3 max-sm:py-3 mt-4"
                  >
                    {index === editCommentIndex ? (
                      <div className="flex gap-5">
                        <textarea
                          type="text"
                          className=" w-full h-10 p-2 mb-4 text-platinum bg-transparent outline-none border-none placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
                          placeholder="Edit your comment..."
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                          autoComplete="off"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(comment._id)}
                          className="text-sm max-sm:text-xs hover:text-green-500 transition-all duration-200"
                        >
                          <DoneIcon fontSize="small" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg max-sm:text-sm font-mukta">
                          {comment.content}
                        </p>
                      </div>
                    )}

                    <div className="text-sm font-mukta max-sm:text-xs opacity-80 flex justify-end gap-2">
                      {(comment?.userId?._id === session?.user.id ||
                        session?.user.email === adminEmail) && (
                        <div className="flex mx-1 max-sm:mx-0 gap-2">
                          {comment?.userId?._id === session?.user.id && (
                            <button
                              onClick={() => {
                                setEditCommentIndex(
                                  editCommentIndex === -1 ? index : -1
                                );
                                setEditCommentContent(comment.content);
                              }}
                              className="text-green-500 hover:text-green-600 transition-all duration-200 max-sm:text-xs"
                            >
                              {index === editCommentIndex ? (
                                <span className="text-platinum hover:text-light transition-all duration-100">
                                  Cancel
                                </span>
                              ) : (
                                <span>Edit</span>
                              )}
                            </button>
                          )}

                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-red-600 hover:text-red-700 transition-all duration-200 max-sm:text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      )}

                      <div>
                        By:{" "}
                        {comment?.userId?._id === session?.user.id ? (
                          <span className="text-cyan">You</span>
                        ) : (
                          <span className="text-cyan">
                            {comment?.userId?.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-20 max-sm:mt-10 sm:text-2xl font-medium font-mukta mb-4 text-platinum flex-center">
              No comments yet. Add the first one above 👆
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Post;
