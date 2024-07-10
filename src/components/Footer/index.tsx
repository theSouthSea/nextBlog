import { ReactNode } from "react";
import styles from "./index.module.scss";

export default function Footer({ children }: { children: ReactNode }) {
  return (
    <div className={styles.footer}>
      <footer className="bg-gray-800 text-white p-4">{children}</footer>
    </div>
  );
}

