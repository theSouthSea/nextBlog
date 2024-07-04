import { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return (
    <>
      <footer className="bg-gray-800 text-white p-4">{children}</footer>
    </>
  );
}

