"use client";
import { signIn, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

const LoginDiv = ({ handleClick }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const result = await getProviders();
      setProviders(result);
    };
    fetchProviders();
  }, []);

  return (
    <div className="h-[50vh] w-[50vw] fixed top-[25vh] left-[25vw] max-sm:w-[90vw] max-sm:left-[5vw] max-sm:h-[35vh] max-sm:top-[32.5vh] rounded-xl flex-center bg-extra border-opacity-30 shadow-extra shadow-lg drop-shadow-lg">
      <div className="flex-center flex-col">
        <div className="flex-center flex-col gap-1">
          <h1 className="text-4xl max-sm:text-2xl font-bold text-cyan">
            Hi Reader!
          </h1>
          <p className="text-platinum text-sm max-sm:text-[0.7rem] max-sm:px-2 max-sm:text-wrap text-center">
            Please Sign In to continue
          </p>
        </div>
        <div className="mt-5 flex-center flex-col gap-3">
          {providers &&
            Object.values(providers).map((provider) => (
              <center key={provider.id}>
                <button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "/home",
                    })
                  }
                  className="border-cyan border-[1px] rounded-2xl px-3 max-sm:px-2 text-cyan font-medium py-1 w-fit hover:text-extra hover:bg-cyan transition-all duration-150 max-sm:p-1"
                >
                  <span className="max-sm:text-sm max-sm:p-1">
                    Sign In with {provider.name}
                  </span>
                </button>
              </center>
            ))}
        </div>
        <div className="mt-8">
          <p
            onClick={handleClick}
            className="cursor-pointer text-red-500 hover:text-red-700 text-lg max-sm:text-sm"
          >
            Cancel
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginDiv;

//h-[50vh] w-[50vw] fixed top-[25vh] left-[25vw] rounded-xl flex-center bg-light
