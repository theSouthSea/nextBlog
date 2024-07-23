"use client";
import { Button, Input, message, Select } from "antd";
import styles from "./index.module.scss";
import { ChangeEvent, useEffect, useState } from "react";
import request from "@/services/fetch";
import { useRouter } from "next/navigation";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ITag } from "pages/api";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
interface EditorProps {
  originTitle: string;
  originContent: string;
  articleId: number;
  tagIds: number[];
}

const Editor = ({
  originTitle,
  originContent,
  articleId,
  tagIds: propTagIds,
}: EditorProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(originTitle);
  const [content, setContent] = useState(originContent);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [tagIds, setTagIds] = useState<number[]>(propTagIds);

  useEffect(() => {
    request.get("/api/tag/get").then((res: any) => {
      if (res.code === 0) {
        const { allTags = [] } = res.data;
        console.log("allTags=", allTags);
        setAllTags(allTags);
      }
    });
  }, []);
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
        tagIds,
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
  const handleSelectChange = (value: number[]) => {
    console.log(`selected ${value}`);
    setTagIds(value);
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
        <Select
          mode="multiple"
          placeholder="请选择标签"
          className={styles.tagSelect}
          onChange={handleSelectChange}
          value={tagIds}
          allowClear
        >
          {allTags?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id} title={item.title}>
                {item.title}
              </Select.Option>
            );
          })}
        </Select>
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

