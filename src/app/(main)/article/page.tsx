import ArticleItem from "@/components/ArticleItem";
import { Divider } from "antd";
import { AppDataSource, initDataSource } from "db";
import { Article } from "db/entity";

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
export const getData = async () => {
  // const { userId, nicjkname, avatar } = ctx.req.cookies || {};
  await initDataSource();
  const articleRepo = AppDataSource.getRepository(Article);
  const articles = await articleRepo.find({
    relations: ["user"],
    order: {
      create_time: "DESC",
    },
  });
  console.log("articles=", articles);
  return articles;
};
interface User {
  id: number;
  nickname: string;
  avatar: string;
}
interface IArticle {
  id: number;
  title: string;
  content: string;
  create_time: Date;
  user: User;
}
interface IArticlesPageProps {
  articles: IArticle[];
}
const ArticlesPage = async () => {
  const articles = await getData();
  return (
    <div className="content-layout">
      {articles?.map((article) => {
        return (
          <>
            <ArticleItem article={article} key={article.id}></ArticleItem>
            <Divider></Divider>
          </>
        );
      })}
    </div>
  );
};
export default ArticlesPage;

