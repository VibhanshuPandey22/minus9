"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import HomePostcard from "@components/HomePostcard";
import Loading from "@components/Loading";

const Home = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        const result = await fetch(`/api/posts/${id.toString()}`, {
          method: "DELETE",
        });
        if (result.ok) {
          console.log("refreshing...");
          setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        } else {
          console.log("Failed to delete post");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit?id=${id}`);
  };

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      router.push("/unauthorized");
    } else {
      const getAllPosts = async () => {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const result = await response.json();
        console.log(result);
        const { allPosts } = result;
        setPosts(allPosts);
      };
      getAllPosts();
      setLoading(false);
    }
  }, [session, status, router, adminEmail]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex-center flex-col-reverse gap-5">
        {posts.map((currentPost) => (
          <div key={currentPost._id}>
            <HomePostcard
              id={currentPost._id}
              title={currentPost.title}
              content={currentPost.content}
              explanation={currentPost.explanation}
              summary={currentPost.summary}
              time={currentPost.createdAt}
              handleDelete={() => handleDelete(currentPost._id)}
              handleEdit={() => handleEdit(currentPost._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
