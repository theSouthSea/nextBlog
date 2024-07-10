import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { AppDataSource, initDataSource } from "db";
import { Article, User } from "db/entity";
import { EXCEPTION_ARTICLE } from "pages/config/codes";

export default async function createArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = "", content = "", id = 0 } = req.body;
  await initDataSource();
  const articleRepository = AppDataSource.getRepository(Article);
  const userRepository = AppDataSource.getRepository(User);

  const article = await articleRepository.findOne({
    where: { id: id },
    relations: ["user"],
  });
  if (article) {
    article.title = title;
    article.content = content;
    article.update_time = new Date();
    const resArticle = await articleRepository.save(article);
    if (resArticle) {
      res.status(200).json({
        code: 0,
        msg: "更新成功",
        data: resArticle,
      });
    } else {
      res.status(200).json({
        ...EXCEPTION_ARTICLE.UPDATE_FAIL,
        data: null,
      });
    }
  } else {
    res.status(200).json({
      ...EXCEPTION_ARTICLE.NoT_FOUND,
      data: null,
    });
  }
}

