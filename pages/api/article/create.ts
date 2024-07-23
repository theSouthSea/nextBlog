import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { AppDataSource, initDataSource } from "db";
import { Article, Tag, User } from "db/entity";
import { EXCEPTION_ARTICLE } from "pages/config/codes";

export default async function createArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const { title = "", content = "", tagIds = [] } = req.body;
  console.log("tagIds=", tagIds);
  await initDataSource();
  const articleRepository = AppDataSource.getRepository(Article);
  const userRepository = AppDataSource.getRepository(User);
  const TagRepository = AppDataSource.getRepository(Tag);

  const user = await userRepository.findOneBy({ id: session.userId });
  const tags = await TagRepository.find({
    where: tagIds?.map((tagId: number) => ({ id: tagId })),
  });
  console.log("tags=", tags);
  const article = new Article();
  article.title = title;
  article.content = content;
  article.is_delete = 0;
  article.create_time = new Date();
  article.update_time = new Date();
  article.views = 0;
  console.log("user=", user);
  console.log("article=", article);
  if (user) {
    article.user = user;
  }
  if (tags) {
    const newTags = tags.map((tag) => {
      tag.article_count = tag.article_count + 1;
      return tag;
    });
    article.tags = newTags;
  }
  const resArticle = await articleRepository.save(article);
  console.log("resArticle=", resArticle);
  if (resArticle) {
    res.status(200).json({
      code: 0,
      msg: "创建成功",
      data: resArticle,
    });
  } else {
    res.status(200).json({
      ...EXCEPTION_ARTICLE.PUBLISH_FAIL,
      data: null,
    });
  }
}

