import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="min-h-[50vh] max-sm:min-h-64 flex items-end w-screen">
      <footer className="bg-extra mt-10 text-gray-800 w-full flex items-end grow">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-4 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium mb-2 max-sm:text-sm max-sm:mb-0">
                Connect With Me
              </h3>
              <div className="flex space-x-4 max-sm:space-x-2">
                <Link
                  href="https://www.instagram.com/_vibhxnshu_/"
                  className="hover:text-secondary text-gray-800 transition-all duration-200"
                >
                  <InstagramIcon className="max-sm:text-lg" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/vibhanshu-pandey-3a733b2bb/"
                  className="hover:text-secondary text-gray-800 transition-all duration-200"
                >
                  <LinkedInIcon className="max-sm:text-lg" />
                </Link>
              </div>
            </div>
          </div>
          <div className="pt-6 text-sm text-center text-gray-800 max-sm:text-xs max-sm:pt-4">
            <p className="text-gray-800">
              &copy; {new Date().getFullYear()}, minus9. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
