"use client";
import { Avatar } from "antd";
import styles from "./index.module.scss";
import { IComment } from "pages/api";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
import "@/utils/relativeTime";
import dayjs from "dayjs";
interface CommentListProps {
  comments: IComment[];
}
export interface RefProps {
  setList: (data: IComment) => void;
}
const CommentList = ({ comments }: CommentListProps, ref: Ref<RefProps>) => {
  const [commentList, setCommentList] = useState(comments);
  console.log("CommentList-render", commentList[0]);
  useImperativeHandle(ref, () => ({
    setList(data: IComment) {
      console.log("ref-setList-data", data);
      // setCommentList([data].concat(commentList));
      // setCommentList((prev) => [data].concat(prev));
      setCommentList([data, ...commentList]);
    },
  }));
  return (
    <div className={styles.commentList}>
      {commentList?.map((comment) => {
        const { id, content, update_time, user } = comment;
        const { nickname, avatar } = user || {};
        return (
          <div className={styles.wrapper} key={id}>
            <Avatar src={avatar} size={40}></Avatar>
            <div className={styles.commentInfo}>
              <div className={styles.topInfo}>
                <div className={styles.name}>{nickname}</div>
                <div className={styles.time}>
                  {/* {update_time?.toLocaleString()} */}
                  <span className={styles.formatTime}>
                    {dayjs(update_time).format("YYYY-MM-DD HH:mm:ss")}
                  </span>
                  <span className={styles.fromNow}>
                    {dayjs(update_time).fromNow()}
                  </span>
                </div>
              </div>
              <div className={styles.content}>{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default forwardRef(CommentList);

