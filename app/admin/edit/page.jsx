"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EditForm from "@components/EditForm";
import { useSession } from "next-auth/react";
import Loading from "@components/Loading";

const EditPost = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const router = useRouter();
  const [postToEdit, setPostToEdit] = useState({
    title: "",
    content: "",
    summary: "",
    explanation: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session || session.user?.email !== adminEmail) {
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
            setPostToEdit({
              title: post.title,
              content: post.content,
              summary: post.summary,
              explanation: post.explanation,
            });
          } catch (error) {
            console.log(error);
          }
        };
        getPostDetails();
        setLoading(false);
      }
    }
  }, [session, status, router, adminEmail, postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    if (!postId) return alert("No post ID found!");
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postToEdit.title,
          content: postToEdit.content,
          summary: postToEdit.summary,
          explanation: postToEdit.explanation,
        }),
      });
      if (response.ok) {
        router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (!loading) {
    return (
      <div>
        <EditForm
          postToEdit={postToEdit}
          setPostToEdit={setPostToEdit}
          handleSubmit={updatePost}
        />
      </div>
    );
  }
};

export default EditPost;
