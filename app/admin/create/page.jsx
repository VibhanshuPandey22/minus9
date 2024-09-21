"use client";
import Loading from "@components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const CreatePost = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (
      status === "authenticated" &&
      (!session || session.user?.email !== adminEmail)
    ) {
      router.push("/unauthorized");
    }
  }, [session, status, router, adminEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !summary || !explanation) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const result = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          creatorId: session?.user.id,
          title,
          content,
          summary,
          explanation,
        }),
      });

      if (result.ok) {
        router.push("/admin");
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <section className="flex-center flex-col mx-8">
      <div className="w-full ">
        <form
          onSubmit={handleSubmit}
          className="flex-center flex-col gap-3 w-full mt-7"
        >
          <input
            type="text"
            value={session?.user?.email}
            className="w-full p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          />
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type="text"
            placeholder="Content"
            className="w-full h-32 p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          />
          <input
            onChange={(e) => setSummary(e.target.value)}
            value={summary}
            type="text"
            placeholder="Summary"
            className="w-full p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          />
          <textarea
            onChange={(e) => setExplanation(e.target.value)}
            value={explanation}
            type="text"
            placeholder="Explanation"
            className="w-full h-32 p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          />

          <div className="px-7 flex items-center gap-5 mt-4">
            <button
              type="submit"
              className="text-extra bg-green-500 hover:bg-green-600 font-mukta font-medium text-sm px-2 py-1 rounded-2xl flex-center hover:text-extra transition-all duration-150"
            >
              Add Topic
            </button>
            <button className="text-red-600 font-mukta font-medium text-sm flex-center hover:text-red-700 transition-all duration-150">
              <Link href="/admin">Cancel</Link>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
