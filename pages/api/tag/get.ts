import { ironOptions } from "@/config";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { AppDataSource, initDataSource } from "db";
import { Article, Tag, User } from "db/entity";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  // const cookies =
  const { userId = 0 } = session;
  await initDataSource();
  const tagRepo = AppDataSource.getRepository(Tag);
  const articleRepo = AppDataSource.getRepository(Article);
  const userRepo = AppDataSource.getRepository(User);
  const followTags = await tagRepo.find({
    // where: (qb: any) => {
    //   qb.where("user_id = :userId", { userId });
    //   // qb.where("user.id = :userId", { userId });
    // },
    where: {
      users: {
        id: userId,
      },
      // user_id: userId,
    },
    // where: {
    //   users: {
    //     id: userId,
    //   },
    // },
    relations: ["users"],
  });
  const allTags = await tagRepo.find({
    relations: ["users"],
  });
  // console.log("followTags-2=", followTags);
  // console.log("allTags=", allTags);
  res.status(200).json({
    code: 0,
    msg: "获取成功",
    data: {
      followTags,
      allTags,
    },
  });
}

