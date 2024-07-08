import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { User, UserAuth } from "db/entity";
import { AppDataSource, initDataSource } from "db";
// import { cookies } from "next/headers";
import { ISession } from "..";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  // const cookiesRes = cookies();
  // const cookies = req.cookies;
  // const session2 = await getIronSession<ISession>(cookies, ironOptions);
  console.log("session=", session);
  // console.log("session2=", session2);
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  console.log("login-req.body=", req.body);
  // const db = await prepareConnection();
  await initDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const userAuthRepo = AppDataSource.getRepository(UserAuth);
  const users = await userRepo.find();
  console.log("users=", users);
  console.log("session.verify=", session.verifyCode, verify);
  if (String(session.verifyCode) === String(verify)) {
    const userAuth = await userAuthRepo.findOneBy(
      {
        identity_type,
        identifier: phone,
      },
      {
        relations: ["user"],
      }
    );
    if (userAuth) {
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
    }
  }
  res.status(200).json({
    code: 0,
    data: {
      token: "123456",
      userInfo: {
        phone,
        verify,
      },
    },
    msg: "登陆成功",
  });
}

