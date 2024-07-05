import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { User, UserAuth } from "db/entity";
import { prepareConnection } from "db";
import { ISession } from "..";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const { phone = "", verify = "", identity_type = "phone" } = req.body;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User);
  const userAuthRepo = db.getRepository(UserAuth);
  const users = await userRepo.find();
  console.log("users=", users);
  if (String(session.verify) === String(verify)) {
    const userAuth = await userAuthRepo.findOne(
      {
        identity_type,
        identifier: phone,
      }
      // {
      //   relations: ["user"],
      // }
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
      newUserAuth.credential = session.verify;
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

