import { ITag } from "pages/api";
import styles from "./index.module.scss";
import * as ANTD_ICONS from "@ant-design/icons";
import { Button, message } from "antd";
import request from "@/services/fetch";
interface TagListProps {
  list: ITag[];
  userId?: number;
  onChange: () => void;
}
const TagList = ({ list, userId, onChange }: TagListProps) => {
  const handleUnfollow = (tagId: number) => {
    request
      .post("/api/tag/followSwitch", {
        tagId: tagId,
        type: "unfollow",
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.warning("取消关注成功");
          onChange();
        } else {
          message.warning("取消关注失败");
        }
      });
  };
  const handleFollow = (id: number) => {
    request
      .post("/api/tag/followSwitch", {
        tagId: id,
        type: "follow",
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.success("关注成功");
          onChange();
        } else {
          message.warning("关注失败");
        }
      });
  };
  return (
    <>
      {list.map((item) => {
        return (
          <div key={item.title} className={styles.tagWrapper}>
            <div>{(ANTD_ICONS as any)[item.icon].render()}</div>
            <div className={styles.title}>{item.title}</div>
            <div>
              {item.follow_count}关注&nbsp;{item.article_count}文章
            </div>
            {item.users?.find((user) => Number(user.id) === Number(userId)) ? (
              <Button
                className={styles.followBtn}
                onClick={() => handleUnfollow(item.id)}
              >
                取消关注
              </Button>
            ) : (
              <Button
                className={styles.followBtn}
                onClick={() => handleFollow(item.id)}
              >
                关注
              </Button>
            )}
          </div>
        );
      })}
    </>
  );
};
export default TagList;

