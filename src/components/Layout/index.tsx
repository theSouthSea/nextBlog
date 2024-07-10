import { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar>Navbar</Navbar>
      <main>{children}</main>
      <Footer>Next.js+Ant Design 实战</Footer>
    </>
  );
}

