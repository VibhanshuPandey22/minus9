import React from "react";
import Link from "next/link";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const Unauthorized = () => {
  return (
    <div className="flex-center min-h-[60vh] mx-14 max-sm:mx-8">
      <div className="flex-center flex-col gap-5">
        <div className="flex-center gap-3 max-sm:gap-1 text-platinum text-8xl max-md:text-6xl max-lg:text-7xl max-sm:text-4xl font-medium font-mukta tracking-tight">
          Access Denied!
        </div>
        <div className="text-cyan text-sm font-mukta text-center">
          You don't have permission to access this page as you are not the
          admin. Please check your credentials or contact the admin for
          assistance.
        </div>
        <div className="px-7 flex items-center mt-5">
          <button className="text-platinum font-mukta font-medium text-sm border-cyan border-[1px] px-2 py-1 rounded-2xl flex-center  hover:bg-cyan hover:text-light transition-all duration-150">
            <Link href="/home">Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
