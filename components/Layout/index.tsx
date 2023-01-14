import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {/* <main className="min-h-screen bg-slate-100 px-4 pt-8">{children}</main> */}
      {children}
      <Footer />
    </>
  );
};
export default Layout;
