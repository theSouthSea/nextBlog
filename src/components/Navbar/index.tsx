"use client";
import { ReactNode, useState } from "react";
import { navs } from "./config";
import styles from "./index.module.scss";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import LoginModal from "../LoginModal";
import { useStore } from "@/store";
import {
  DownOutlined,
  SmileOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import { useRouter } from "next/router";
import request from "@/services/fetch";
import { IUserInfo } from "@/store/userStore";
import { observer } from "mobx-react-lite";

function Navbar({ children }: { children: ReactNode }) {
  // next.js 14这种用法已经废除,使用usePathname获取路由路径
  // const {pathname} = useRouter()
  const pathname = usePathname();
  const store = useStore();
  const { userId, avatar, nickname } = store.user.userInfo;

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
  // const router = useRouter();
  const handleLogout = () => {
    request.post("/api/user/logout").then((res: any) => {
      // router.push("/");
      if (res.code === 0) {
        store.user.setUserInfo({} as IUserInfo);
      }
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          <HomeOutlined></HomeOutlined>
          &nbsp;个人主页
        </a>
      ),
    },
    {
      key: "2",
      label: <div onClick={handleLogout}>退出系统</div>,
      icon: <LogoutOutlined />,
    },
  ];
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
        {store.user.userInfo?.userId ? (
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar src={avatar} size={32}></Avatar>
                <span>{nickname}</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
        )}
        {/* <Button type="primary" onClick={handleLogin}>
          登录
        </Button> */}
      </section>
      <LoginModal
        isShow={isShowLoginModal}
        onClose={handleLoginModalClose}
      ></LoginModal>
    </div>
  );
}
export default observer(Navbar);
function LinkItem({ children, ...rest }: any) {
  return <a {...rest}>{children}</a>;
}

