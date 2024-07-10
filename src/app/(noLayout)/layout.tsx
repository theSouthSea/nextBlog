import type { GetServerSidePropsContext, Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { StoreProvider } from "@/store/index";
import { IRootStore } from "@/store/rootStore";
import { cookies } from "next/headers";
import { IUserInfo } from "@/store/userStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cokiesObj = cookies();
  console.log(
    "noLayout-RootLayout-cokiesObj.userId=",
    (cokiesObj as any)["userId"]
  );
  const initialValues: IRootStore = {
    user: {
      userInfo: {
        userId: Number(cokiesObj.get("userId")?.value),
        nickname: cokiesObj.get("nickname")?.value,
        avatar: cokiesObj.get("avatar")?.value,
      },
    },
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <StoreProvider initialValues={initialValues}>
            {children}
          </StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

