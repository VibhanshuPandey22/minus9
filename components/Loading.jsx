import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-md p-8">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="w-10 h-10 max-sm:w-6 max-sm:h-6 text-cyan animate-spin" />
          <h1 className="text-2xl max-sm:text-xl font-bold text-platinum animate-pulse font-mukta ">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Loading;

// import Loading from "@components/Loading";

// const [loading, setLoading] = useState(true);

// if (status === "loading") {
//   return <Loading />;
// }

// const { data: session, status } = useSession();

// if (loading) {
//   return <Loading />;
// }
