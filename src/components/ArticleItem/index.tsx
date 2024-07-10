import Link from "next/link";
import { IArticle } from "pages/api";
import styles from "./index.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import "@/utils/relativeTime";
import dayjs from "dayjs";
import markdownToTxt from "markdown-to-txt";

interface ArticleItemProps {
  article: IArticle;
}
const ArticleItem = ({ article }: ArticleItemProps) => {
  const { user, id, title, content, create_time, views } = article;
  const { nickname, avatar } = user;
  return (
    <Link href={`article/${id}`}>
      <div className={styles.container}>
        <div className={styles.article}>
          <div className={styles.userInfo}>
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.time}>{create_time.toLocaleString()}</span>
            <span className={styles.time}>{dayjs(create_time).fromNow()}</span>
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{markdownToTxt(content)}</div>
          <div className={styles.statistics}>
            <EyeOutlined></EyeOutlined>
            <span>{views}</span>
          </div>
        </div>
        <Avatar src={avatar} size={48}></Avatar>
      </div>
    </Link>
  );
};
export default ArticleItem;

