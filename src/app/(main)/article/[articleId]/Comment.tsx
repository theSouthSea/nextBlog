"use client";
import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
import { Avatar, Button, Input, message } from "antd";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import request from "@/services/fetch";
import { IComment } from "pages/api";
interface CommentProps {
  avatar?: string;
  articleId: number;
  onSuccess?: (data: IComment) => void;
}
const Comment = ({ avatar, articleId, onSuccess }: CommentProps) => {
  const store = useStore();
  const { userId } = store.user.userInfo;
  console.log("userId=", userId);
  const [content, setContent] = useState("");
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    console.log("评论内容：", content);
    // 在这里可以发送评论到服务器
    request
      .post("/api/comment/publish", {
        content,
        articleId,
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.success("评论成功");
          onSuccess?.(res.data);
          setContent("");
        } else {
          message.error(res.msg || "评论失败");
        }
      });
  };
  return userId ? (
    <div className={styles.enter}>
      <Avatar src={avatar} size={40}></Avatar>
      <div className={styles.content}>
        <Input.TextArea
          placeholder="请输入评论"
          rows={4}
          value={content}
          onChange={handleContentChange}
        ></Input.TextArea>
        <Button type="primary" onClick={handleSubmit}>
          发表评论
        </Button>
      </div>
    </div>
  ) : null;
};
export default observer(Comment);

