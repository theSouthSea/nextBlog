import { ironOptions } from "@/config";
import { getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { ISession, ITag } from "..";
import { AppDataSource, initDataSource } from "db";
import { Article, Tag, User } from "db/entity";
import { EXCEPTION_TAG, EXCEPTION_USER } from "pages/config/codes";

export default async function followSwitch(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const { userId = 0 } = session;
  const { tagId, type } = req.body;
  await initDataSource();
  const tagRepo = AppDataSource.getRepository(Tag);
  const articleRepo = AppDataSource.getRepository(Article);
  const userRepo = AppDataSource.getRepository(User);
  const tagRes = (await tagRepo.findOne({
    where: {
      id: tagId,
    },
    relations: ["users"],
  })) as ITag;
  const userRes = await userRepo.findOne({
    where: {
      id: userId,
    },
  });
  if (!userRes) {
    res.status(200).json({
      ...EXCEPTION_USER.NOT_LOGIN,
      // msg: "您还未登陆",
      data: null,
    });
    return;
  }
  if (!tagRes) {
    res.status(200).json({
      ...(type === "follow"
        ? EXCEPTION_TAG.FOLLOW_FAIL
        : EXCEPTION_TAG.UNFOLLOW_FAIL),
      data: null,
    });
  } else {
    if (type === "follow") {
      tagRes.users.push(userRes);
      tagRes.follow_count = tagRes.follow_count + 1;
      await tagRepo.save(tagRes);
      res.status(200).json({
        code: 0,
        msg: "关注成功",
        data: null,
      });
    } else {
      tagRes.users = tagRes.users.filter((item: any) => {
        return item.id !== userId;
      });
      tagRes.follow_count = tagRes.follow_count - 1;
      await tagRepo.save(tagRes);
      res.status(200).json({
        code: 0,
        msg: "取消关注成功",
        data: null,
      });
    }
  }
}

