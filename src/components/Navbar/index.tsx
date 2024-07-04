"use client";
import { ReactNode, useState } from "react";
import { navs } from "./config";
import styles from "./index.module.scss";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "antd";
import LoginModal from "../LoginModal";

export default function Navbar({ children }: { children: ReactNode }) {
  // next.js 14这种用法已经废除,使用usePathname获取路由路径
  // const {pathname} = useRouter()
  const pathname = usePathname();
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const handleWrite = () => {
    console.log("write");
  };
  const handleLogin = () => {
    console.log("login");
    setIsShowLoginModal(true);
  };
  const handleLoginModalClose = () => {
    console.log("login modal close");
    setIsShowLoginModal(false);
  };
  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG DSY</section>
      <section className={styles.linkArea}>
        {navs?.map((item, index) => {
          return (
            <Link key={index} passHref legacyBehavior href={item.href}>
              <LinkItem
                className={`${styles.linkItem} ${
                  pathname === item.href ? styles.active : ""
                }`}
              >
                {item.name}
              </LinkItem>
            </Link>
          );
        })}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleWrite}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>
      <LoginModal
        isShow={isShowLoginModal}
        onClose={handleLoginModalClose}
      ></LoginModal>
    </div>
  );
}

function LinkItem({ children, ...rest }: any) {
  return <a {...rest}>{children}</a>;
}

