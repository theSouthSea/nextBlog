import { ironOptions } from "@/config";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "pages/api";
import request from "@/services/fetch";
import { Cookie } from "next-cookie";
import { AppDataSource, initDataSource } from "db";
import { User, UserAuth } from "db/entity";
import { setCookie } from "@/utils";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const cookies = Cookie.fromApiRoute(req, res);
  const code = req.query?.code;
  const githubClientId = "Ov23lizKsHWZgJq1CywL";
  const githubSecret = "1d180774440c38a20d0fecc66bfe054d635a8e8c";
  // const tokenResponse = await axios({
  //   method: 'post',
  //   url: 'https://github.com/login/oauth/access_token?' +
  //     `client_id=${githubClientId}&` +
  //     `client_secret=${githubSecret}&` +
  //     `code=${code}`,
  //   headers: {
  //     accept: 'application/json'
  //   }
  // });
  const url = `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubSecret}&code=${code}`;
  const authRes = await request.post(
    url,
    {},
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  console.log("authRes=", authRes);
  const { access_token } = authRes as any;
  const userRes = await request.get("https://api.github.com/user", {
    headers: {
      accept: "application/json",
      Authorization: `token ${access_token}`,
    },
  });
  const { id: githubUserId, login = "", avatar_url = "" } = userRes as any;
  console.log("userRes=", userRes);

  await initDataSource();
  const userAuthRepository = AppDataSource.getRepository(UserAuth);
  const userAuth = await userAuthRepository.findOne({
    where: {
      identifier: githubUserId,
      identity_type: "github",
    },
    relations: ["user"],
  });
  console.log("userAuth=", userAuth);
  if (userAuth) {
    const { user } = userAuth;
    const { id, nickname, avatar } = user;
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();
    const userInfo = {
      userId: id,
      nickname: nickname,
      avatar: avatar,
    };
    setCookie(cookies, userInfo);
    // res.writeHead(302, {
    //   Location: "/",
    // });
    res.redirect(302, "/");
    // res.status(200).json({
    //   code: 0,
    //   msg: '登录成功',
    //   data: userInfo
    // });
  } else {
    const user = new User();
    user.avatar = avatar_url;
    user.nickname = login;
    user.job = "前端工程师";
    user.introduce = "我是前端工程师";
    const userAuth = new UserAuth();
    userAuth.identity_type = "github";
    userAuth.identifier = githubUserId;
    userAuth.user = user;
    userAuth.credential = access_token;
    const resUserAuth = await userAuthRepository.save(userAuth);
    console.log("resUserAuth=", resUserAuth);
    const { id, nickname, avatar } = resUserAuth.user;
    session.userId = id;
    session.nickname = nickname;
    session.avatar = avatar;
    await session.save();
    setCookie(cookies, {
      userId: id,
      nickname: nickname,
      avatar: avatar,
    });
    // res.status(200).json({
    //   code: 200,
    //   message: "登录成功",
    //   data: {
    //     userId: id,
    //     nickname: nickname,
    //     avatar: avatar,
    //   },
    // });
    // res.writeHead(302, {
    //   Location: "/",
    // });
    res.redirect(302, "/");
  }
}

