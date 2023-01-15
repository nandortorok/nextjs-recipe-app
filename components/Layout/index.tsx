import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["100", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "optional",
});

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className={roboto.className}>{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
