import ArticleItem from "@/components/ArticleItem";
import { Divider } from "antd";
import { IArticle } from "pages/api";
// import { useState } from "react";

const Articles = ({ articles }: { articles: IArticle[] }) => {
  // const [showArticles, setShowArticles] = useState<IArticle[]>([...articles]);
  return (
    <div>
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
export default Articles;
