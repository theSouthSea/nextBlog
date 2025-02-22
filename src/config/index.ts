export const ironOptions = {
  cookieName: process.env.SESSION_COOKIE_NAME,
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
};
// 验证码5分钟后过期
export const expireMinute = 5;
