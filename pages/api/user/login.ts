import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { User, UserAuth } from "db/entity";
import { AppDataSource, initDataSource } from "db";
import { Cookie } from "next-cookie";
// import { cookies } from "next/headers";
import { ISession } from "..";
import { setCookie } from "@/utils";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  // const cookiesRes = cookies();
  // const cookies = req.cookies;
  // const session2 = await getIronSession<ISession>(cookies, ironOptions);
  console.log("session=", session);
  // console.log("session2=", session2);
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  console.log("login-req.body=", req.body);
  const cookiesObj = Cookie.fromApiRoute(req, res);
  // const db = await prepareConnection();
  await initDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const userAuthRepo = AppDataSource.getRepository(UserAuth);
  const users = await userRepo.find();
  console.log("users=", users);
  console.log("session.verify=", session.verifyCode, verify);
  if (String(session.verifyCode) === String(verify)) {
    // const userAuth = await userAuthRepo.findOneBy(
    // const userAuth = await userAuthRepo.findOne(
    //   {
    //     identity_type,
    //     identifier: phone,
    //   },
    //   {
    //     relations: ["user"],
    //   }
    // );
    const userAuth = await userAuthRepo.findOne({
      where: {
        identity_type,
        identifier: phone,
      },
      relations: ["user"],
    });
    console.log("userAuth-4=", userAuth);
    if (userAuth) {
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      setCookie(cookiesObj, { userId: id, nickname, avatar });
      res.status(200).json({
        code: 0,
        data: {
          userId: id,
          nickname,
          avatar,
        },
        msg: "登陆成功",
      });
    } else {
      // 不存在,自动注册新用户
      const user = new User();
      user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
      user.avatar = "/images/avatar.jpg";
      user.job = "程序员";
      user.introduce = "这个人很懒，什么都没有留下";

      const newUserAuth = new UserAuth();
      newUserAuth.identifier = phone;
      newUserAuth.identity_type = identity_type;
      newUserAuth.credential = session.verifyCode;
      newUserAuth.user = user;

      const resUserAuth = await userAuthRepo.save(newUserAuth);
      console.log("resUserAuth=", resUserAuth);
      const {
        user: { id, nickname, avatar },
      } = resUserAuth;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();
      setCookie(cookiesObj, { userId: id, nickname, avatar });
      res.status(200).json({
        code: 0,
        data: {
          userId: id,
          nickname,
          avatar,
        },
        msg: "登陆成功",
      });
    }
  } else {
    res.status(200).json({
      code: -1,
      data: null,
      msg: "验证码错误",
    });
  }
}

