import Provider from "@components/Provider";
import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: "grae",
  description: "Take my perspective, and give yours",
};

const RootLayout = ({ children }) => {
  return (
    <html className="bg-bgGray" lang="en">
      <body>
        <Provider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
