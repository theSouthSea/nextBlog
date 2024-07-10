"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
// import { commands } from "@uiw/react-md-editor";
// import * as commands from "@uiw/react-md-editor/commands";
import { Button, Input, message } from "antd";
import request from "@/services/fetch";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function NewArticle() {
  const store = useStore();
  const router = useRouter();
  const { userId } = store.user.userInfo;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handlePublish = () => {
    if (!title) {
      message.warning("请输入标题");
      return;
    }
    if (!content) {
      message.warning("请输入内容");
      return;
    }
    request
      .post("/api/article/create", {
        title,
        content,
      })
      .then((res: any) => {
        if (res.code === 0) {
          if (userId) {
            router.replace(`/user/${userId}`);
          } else {
            router.replace(`/`);
          }
          message.success("发布成功");
        }
      })
      .catch((err) => {
        message.error("发布失败", err);
      });
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (value: any) => {
    setContent(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.operation}>
        <Input
          name="title"
          className={styles.title}
          placeholder="请输入文章标题"
          value={title}
          onChange={handleTitleChange}
        ></Input>
        <Button
          className={styles.button}
          onClick={handlePublish}
          type="primary"
        >
          发布
        </Button>
      </div>
      <MDEditor value={content} height={1080} onChange={handleContentChange} />
    </div>
  );
}

export default observer(NewArticle);

