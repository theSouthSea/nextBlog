"use client";
import { Button, Input, message } from "antd";
import styles from "./index.module.scss";
import { ChangeEvent, useState } from "react";
import request from "@/services/fetch";
import { useRouter } from "next/navigation";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
interface EditorProps {
  originTitle: string;
  originContent: string;
  articleId: number;
}

const Editor = ({ originTitle, originContent, articleId }: EditorProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(originTitle);
  const [content, setContent] = useState(originContent);
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
      .post("/api/article/edit", {
        title,
        content,
        id: articleId,
      })
      .then((res: any) => {
        if (res.code === 0) {
          if (articleId) {
            router.replace(`/article/${articleId}`);
          } else {
            router.replace(`/`);
          }
          message.success("更新成功");
        }
      })
      .catch((err) => {
        message.error("更新失败", err);
      });
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (value: any) => {
    setContent(value);
  };
  return (
    <>
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
    </>
  );
};
export default Editor;
