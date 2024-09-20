import { useRouter } from "next/navigation";
const AdminPostcard = ({
  id,
  title,
  content,
  explanation,
  summary,
  time,
  handleDelete,
  handleEdit,
}) => {
  const router = useRouter();
  return (
    <div className="flex-center w-screen ">
      <div className="bg-extra flex justify-center items-baseline flex-col shadow-lg w-full px-6 py-4 mx-16 max-sm:mx-9">
        <div className="flex flex-col gap-2 w-full">
          <div className="w-fit text-cyan hover:text-extra2 transition-all duration-200 text-2xl font-mukta cursor-pointer font-medium">
            <p
              onClick={() => router.push(`/home/post?id=${id}`)}
              className=" break-words max-w-full"
            >
              {title}
            </p>
          </div>
          <div className="w-fit text-platinum text-sm font-mukta font-medium  whitespace-break-spaces">
            <p className="break-words max-w-full">{summary}</p>
          </div>
        </div>
        <div className="flex mt-4 flex-col w-full">
          <div className="text-platinum text-sm w-full font-mukta">
            Created at : <span className="text-cyan">{time}</span>
          </div>
          <div className="mt-5 flex w-full justify-end gap-3">
            <div
              onClick={handleEdit}
              className="text-green-500 text-sm max-sm:text-xs flex cursor-pointer hover:text-green-700 transition-all duration-150"
            >
              Edit
            </div>
            <div
              onClick={handleDelete}
              className="text-red-500 text-sm max-sm:text-xs flex cursor-pointer hover:text-red-700 transition-all duration-150"
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPostcard;
