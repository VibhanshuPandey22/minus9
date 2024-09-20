"use client";
import Link from "next/link";

const EditForm = ({ postToEdit, setPostToEdit, handleSubmit }) => {
  return (
    <div className="mx-8">
      <form
        onSubmit={handleSubmit}
        className="flex-center flex-col gap-3 w-full mt-7"
      >
        <input
          onChange={(e) =>
            setPostToEdit({
              ...postToEdit,
              title: e.target.value,
            })
          }
          value={postToEdit.title}
          className="w-full p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          type="text"
          placeholder="Title"
        />

        <textarea
          onChange={(e) =>
            setPostToEdit({
              ...postToEdit,
              content: e.target.value,
            })
          }
          value={postToEdit.content}
          className="w-full h-32 p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          type="text"
          placeholder="Content"
        />

        <input
          onChange={(e) =>
            setPostToEdit({
              ...postToEdit,
              summary: e.target.value,
            })
          }
          value={postToEdit.summary}
          className="w-full p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          type="text"
          placeholder="Summary"
        />

        <textarea
          onChange={(e) =>
            setPostToEdit({
              ...postToEdit,
              explanation: e.target.value,
            })
          }
          value={postToEdit.explanation}
          className="w-full h-32 p-2 mb-4 text-platinum bg-transparent outline-none border-none shadow-xl placeholder:text-sm max-sm:placeholder:text-xs text-sm max-sm:text-xs placeholder:font-mukta"
          type="text"
          placeholder="Explanation"
        />
        <div className="px-7 flex items-center gap-5 mt-5">
          <button
            type="submit"
            className="text-platinum font-mukta font-medium text-sm border-cyan border-[1px] px-2 py-1 rounded-2xl flex-center hover:bg-cyan hover:text-light transition-all duration-150"
          >
            Update Topic
          </button>
          <button className="text-red-600 font-mukta font-medium text-sm flex-center hover:text-red-700 transition-all duration-150">
            <Link href="/admin">Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
