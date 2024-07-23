import { AppDataSource, initDataSource } from "db";
import { Article, Tag } from "db/entity";
import styles from "./index.module.scss";
import { useCallback, useRef, useState } from "react";
import TagTabs from "./TagTabs";
import { IArticle } from "pages/api";
import Articles from "./Articles";

// next.js 13开始,getServerSideProps不可用
// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   // const { userId, nicjkname, avatar } = ctx.req.cookies || {};
//   await initDataSource();
//   const articleRepo = AppDataSource.getRepository(Article);
//   const articles = await articleRepo.find({
//     relations: ["user"],
//     order: {
//       create_time: "DESC",
//     },
//   });
//   console.log("articles=", articles);
//   return {
//     props: {
//       articles,
//     },
//   };
// };
const getData = async () => {
  // const { userId, nicjkname, avatar } = ctx.req.cookies || {};
  await initDataSource();
  const articleRepo = AppDataSource.getRepository(Article);
  const tagRepo = AppDataSource.getRepository(Tag);
  const articles = await articleRepo.find({
    relations: ["user", "tags"],
    order: {
      update_time: "DESC",
    },
  });
  const tags = await tagRepo.find({
    relations: ["users"],
  });
  // console.log("getData-articles=", articles);
  console.log("getData-tags=", tags);
  const newTags = JSON.parse(JSON.stringify(tags));
  newTags.unshift({
    title: "全部",
    id: 0,
  });
  return {
    articles: JSON.parse(JSON.stringify(articles)),
    tags: newTags,
  };
};
// interface User {
//   id: number;
//   nickname: string;
//   avatar: string;
// }
// interface IArticle {
//   id: number;
//   title: string;
//   content: string;
//   create_time: Date;
//   user: User;
// }
const ArticlesPage = async () => {
  const { articles, tags } = await getData();
  console.log("ArticlesPage-tags=", tags);
  // const testRef = useRef<HTMLDivElement>(null);
  // const needTags = JSON.parse(JSON.stringify(tags));
  // const handleDataChange = useCallback((data: IArticle[]) => {
  //   setShowArticles(data);
  // }, []);
  return (
    // <div className="content-layout" ref={testRef}>
    <div className="content-layout">
      {/* <TagTabs tags={needTags} articles={articles} onTagChange={handleDataChange}></TagTabs> */}
      <TagTabs tags={tags} articles={articles}></TagTabs>
    </div>
  );
};
export default ArticlesPage;

