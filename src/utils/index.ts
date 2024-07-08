import { IUserInfo } from "@/store/userStore";

export const setCookie = (cookies: any, data: Partial<IUserInfo>) => {
  const expireTime = new Date(Date.now() + 1000 * 60 * 60 * 24);
  const path = "/";
  const { userId, nickname, avatar } = data;
  cookies.set("userId", userId, {
    path,
    expires: expireTime,
    sameSite: "strict",
    httpOnly: true,
  });
  cookies.set("nickname", nickname, {
    path,
    expires: expireTime,
    sameSite: "strict",
    httpOnly: true,
  });
  cookies.set("avatar", avatar, {
    path,
    expires: expireTime,
    sameSite: "strict",
    httpOnly: true,
  });
};
export const clearCookies = (cookies: any) => {
  cookies.set("userId", "", {
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
    httpOnly: true,
  });
  cookies.set("nickname", "", {
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
    httpOnly: true,
  });
  cookies.set("avatar", "", {
    path: "/",
    expires: new Date(0),
    sameSite: "strict",
    httpOnly: true,
  });
};

