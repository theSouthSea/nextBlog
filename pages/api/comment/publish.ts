import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { AppDataSource, initDataSource } from "db";
import { Article, User, Comment } from "db/entity";
import { EXCEPTION_ARTICLE, EXCEPTION_COMMENT } from "@/config/codes";

export default async function publishComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const { articleId = "", content = "" } = req.body;
  await initDataSource();
  const articleRepository = AppDataSource.getRepository(Article);
  const userRepository = AppDataSource.getRepository(User);
  const commentRepository = AppDataSource.getRepository(Comment);

  const user = await userRepository.findOneBy({ id: session.userId });
  const article = await articleRepository.findOneBy({ id: Number(articleId) });
  const comment = new Comment();
  comment.content = content;
  comment.is_delete = 0;
  comment.create_time = new Date();
  comment.update_time = new Date();
  console.log("user=", user);
  console.log("comment=", comment);
  if (user) {
    comment.user = user;
  }
  if (article) {
    comment.article = article;
  }
  const resComment = await commentRepository.save(comment);
  console.log("resComment=", resComment);
  if (resComment) {
    res.status(200).json({
      code: 0,
      msg: "发布成功",
      data: resComment,
    });
  } else {
    res.status(200).json({
      ...EXCEPTION_COMMENT.PUBLISH_FAIL,
      data: null,
    });
  }
}

