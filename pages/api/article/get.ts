import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { AppDataSource, initDataSource } from "db";
import { Article, Tag, User } from "db/entity";
import { EXCEPTION_ARTICLE } from "@/config/codes";

export default async function getArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tag_id } = req.query as { tag_id: string };
  const tagId = Number(tag_id);
  console.log("getArticle-tag_id=", tag_id);
  await initDataSource();
  const articleRepository = AppDataSource.getRepository(Article);
  let articles = [];
  if (tagId) {
    articles = await articleRepository.find({
      // where: (qb:any) => {
      //   qb.where("tags.id = :tag_id", { tag_id });
      // },
      where: {
        tags: {
          id: tagId,
        },
      },
      relations: ["user", "tags"],
      order: {
        update_time: "DESC",
      },
    });
  } else {
    articles = await articleRepository.find({
      relations: ["user", "tags"],
      order: {
        update_time: "DESC",
      },
    });
  }

  res.status(200).json({
    code: 0,
    msg: "获取成功",
    data: articles,
  });
}

