import { Avatar, Button, Divider } from "antd";
import styles from "./index.module.scss";
import { AppDataSource, initDataSource } from "db";
import { Article, User } from "db/entity";
import {
  CodeOutlined,
  FireOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import ArticleItem from "@/components/ArticleItem";
import { IArticle, IUser } from "pages/api";

export async function generateStaticParams() {
  await initDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const userRes = await userRepo.find();
  const userIds = userRes.map((item) => ({ id: item.id }));
  return userIds;
}
const getData = async (id: number) => {
  await initDataSource();
  const userRepo = AppDataSource.getRepository(User);
  const articleRepo = AppDataSource.getRepository(Article);
  const userRes = await userRepo.findOne({
    where: {
      id,
    },
  });
  const articleRes = await articleRepo.find({
    where: {
      user: {
        id,
      },
    },
    relations: ["user", "tags"],
    order: {
      update_time: "DESC",
    },
  });
  return {
    articles: JSON.parse(JSON.stringify(articleRes)),
    userInfo: JSON.parse(JSON.stringify(userRes)),
  };
};
export default async function UserPage(ctx: any) {
  const id = Number(ctx.params.id);
  const { articles, userInfo }: { articles: IArticle[]; userInfo: IUser } =
    await getData(id);
  const viewsCount = articles.reduce((pre, cur) => {
    return pre + cur.views;
  }, 0);
  return (
    <div className={styles.userDetail}>
      <div className={styles.left}>
        <div className={styles.userInfo}>
          <Avatar
            className={styles.avatar}
            src={userInfo.avatar}
            size={90}
          ></Avatar>
          <div>
            <div className={styles.nickname}>{userInfo.nickname}</div>
            <div className={styles.desc}>
              <CodeOutlined></CodeOutlined>
              {userInfo.job}
            </div>
            <div className={styles.desc}>
              <FireOutlined></FireOutlined>
              {userInfo.introduce}
            </div>
          </div>
          <Link href="/user/profile">
            <Button>编辑个人资料</Button>
          </Link>
        </div>
        <Divider></Divider>
        <div className={styles.articles}>
          {articles?.map((item) => {
            return <ArticleItem article={item} key={item.id}></ArticleItem>;
          })}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.achievement}>
          <div className={styles.header}>个人成就</div>
          <div className={styles.number}>
            <div className={styles.wrapper}>
              <FundViewOutlined></FundViewOutlined>
              <span>共创建了{articles.length}文章</span>
            </div>
            <div className={styles.wrapper}>
              <FundViewOutlined></FundViewOutlined>
              <span>文章被阅读了{viewsCount}次</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

