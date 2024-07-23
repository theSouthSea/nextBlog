"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { ChangeEvent, useEffect, useState } from "react";
import styles from "./index.module.scss";
// import { commands } from "@uiw/react-md-editor";
// import * as commands from "@uiw/react-md-editor/commands";
import { Button, Input, message, Select } from "antd";
import request from "@/services/fetch";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { ITag } from "pages/api";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function NewArticle() {
  const [messageApi, contextHolder] = message.useMessage();
  const store = useStore();
  const router = useRouter();
  const { userId } = store.user.userInfo;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [tagIds, setTagIds] = useState<number[]>([]);

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
      messageApi.warning("请输入标题");
      return;
    }
    if (!content) {
      messageApi.warning("请输入内容");
      return;
    }
    request
      .post("/api/article/create", {
        title,
        content,
        tagIds,
      })
      .then((res: any) => {
        if (res.code === 0) {
          if (userId) {
            router.replace(`/user/${userId}`);
          } else {
            router.replace(`/`);
          }
          messageApi.success("发布成功");
        }
      })
      .catch((err) => {
        messageApi.error("发布失败", err);
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
    <div className={styles.container}>
      {contextHolder}
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
    </div>
  );
}

export default observer(NewArticle);

