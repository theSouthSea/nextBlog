import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { AppDataSource, initDataSource } from "db";
import { Article, Tag, User } from "db/entity";
import { EXCEPTION_ARTICLE } from "@/config/codes";

export default async function createArticle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = "", content = "", id = 0, tagIds } = req.body;
  await initDataSource();
  const articleRepository = AppDataSource.getRepository(Article);
  const userRepository = AppDataSource.getRepository(User);
  const tagRepository = AppDataSource.getRepository(Tag);
  const tags = await tagRepository.find({
    where: tagIds?.map((tagId: number) => ({ id: tagId })),
  });

  const article = await articleRepository.findOne({
    where: { id: id },
    relations: ["user", "tags"],
  });
  if (article) {
    article.title = title;
    article.content = content;
    article.update_time = new Date();
    const needMinusTags = article.tags.filter((tag) => {
      const needMinusTag = tags.find((item) => item.id === tag.id);
      if (needMinusTag) {
        needMinusTag.article_count = tag.article_count - 1;
      }
      return needMinusTag;
    });
    const newTags = tags?.map((tag) => {
      const isExist = article.tags.find((item) => item.id === tag.id);
      if (isExist) {
        return tag;
      } else {
        tag.article_count = tag.article_count - 1;
        return tag;
      }
    });

    // article.tags?.forEach((tag) => {
    //   const isNotExist = tags?.findIndex((item) => item.id === tag.id) === -1
    //   if(isNotExist){
    //     tag.article_count = tag.article_count - 1;
    //     return tag;
    //   }else{
    //     return tag;
    //   }
    // });
    article.tags = newTags;
    const resArticle = await articleRepository.save(article);
    const upsertRes = await tagRepository.upsert(needMinusTags, ["id"]);
    console.log("upsertRes=", upsertRes);
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

