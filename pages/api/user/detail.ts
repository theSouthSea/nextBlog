import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { User } from "db/entity";
import { AppDataSource, initDataSource } from "db";
import { ISession } from "..";
import { EXCEPTION_USER } from "@/config/codes";
export default async function detail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const { userId } = session;
  await initDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id: userId });
  // const users = await userRepo.findOne({
  //   where:{
  //     id: userId,
  //   }
  // });
  if (user) {
    res.status(200).json({
      code: 0,
      data: user,
      msg: "获取用户信息成功",
    });
  } else {
    res.status(200).json({
      ...EXCEPTION_USER.NOT_EXIST,
      data: null,
    });
  }
}

