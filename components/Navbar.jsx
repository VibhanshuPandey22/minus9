"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <>
      <nav className="bg-bgGray h-12 pt-5 pb-2 mb-20 max-sm:mb-14">
        {session?.user ? (
          <div className="flex justify-between items-center">
            <div className=" px-7 text-4xl max-sm:text-3xl">
              <span
                onClick={() => router.push("/home")}
                className="cursor-pointer text-cyan hover:text-light transition-all duration-150 font-marhey tracking-tight"
              >
                minus9
              </span>
            </div>

            <div className="px-7 flex items-center gap-3">
              {session?.user?.email === adminEmail && (
                <button
                  onClick={() => router.push("/admin")}
                  className="text-cyan font-mukta font-medium text-sm border-cyan border-[1px] px-2 py-1 rounded-2xl flex-center hover:bg-cyan hover:text-extra transition-all duration-150"
                >
                  Admin
                </button>
              )}
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
                className="text-cyan font-mukta font-medium text-sm border-cyan border-[1px] px-2 py-1 rounded-2xl flex-center  hover:bg-cyan hover:text-extra transition-all duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="px-7 text-4xl max-lg:text-4xl max-sm:text-3xl  font-marhey text-cyan tracking-tight pointer-events-none">
              minus9
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

// const [openLoginDiv, setOpenLoginDiv] = useState(false);

//   const handleClick = () => {
//     setOpenLoginDiv((prev) => !prev);
//   };

// <div className="px-7">
// <button
// onClick={handleClick}
// className={`${
//   openLoginDiv && "pointer-events-none"
// } text-platinum font-mukta font-medium text-sm border-cyan border-[1px] px-2 py-1 rounded-2xl flex-center hover:border-platinum  hover:bg-cyan hover:text-light transition-all duration-150`}
// >
// Sign In
// </button>
// </div>

// {openLoginDiv && (
//   <LoginDiv openLoginDiv={openLoginDiv} handleClick={handleClick} />
// )}
