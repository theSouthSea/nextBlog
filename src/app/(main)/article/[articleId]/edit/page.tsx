// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";
// import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
// import { commands } from "@uiw/react-md-editor";
// import * as commands from "@uiw/react-md-editor/commands";
import { Button, Input, message } from "antd";
import request from "@/services/fetch";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { AppDataSource, initDataSource } from "db";
import { Article } from "db/entity";
import Editor from "./Editor";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

async function getData(articleId: string) {
  await initDataSource();
  const articleRepo = AppDataSource.getRepository(Article);
  const articleRes = await articleRepo.findOne({
    where: {
      id: Number(articleId),
    },
    relations: ["user"],
  });
  return articleRes;
}

async function NewArticle(ctx: any) {
  const { params, searchParams } = ctx;
  const { articleId } = params;
  console.log("articleId=", articleId);
  const article = await getData(articleId);
  const { title: originTitle = "", content: originContent = "" } =
    article || {};
  // const store = useStore();
  // const { userId } = store.user.userInfo;
  // const router = useRouter();
  // const [title, setTitle] = useState(originTitle);
  // const [content, setContent] = useState(originContent);
  // const handlePublish = () => {
  //   if (!title) {
  //     message.warning("请输入标题");
  //     return;
  //   }
  //   if (!content) {
  //     message.warning("请输入内容");
  //     return;
  //   }
  //   request
  //     .post("/api/article/edit", {
  //       title,
  //       content,
  //       id: articleId,
  //     })
  //     .then((res: any) => {
  //       if (res.code === 0) {
  //         if (articleId) {
  //           router.replace(`/article/${articleId}`);
  //         } else {
  //           router.replace(`/`);
  //         }
  //         message.success("更新成功");
  //       }
  //     })
  //     .catch((err) => {
  //       message.error("更新失败", err);
  //     });
  // };
  // const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // };
  // const handleContentChange = (value: any) => {
  //   setContent(value);
  // };
  return (
    <div className={styles.container}>
      {/* <div className={styles.operation}>
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
      <MDEditor value={content} height={1080} onChange={handleContentChange} /> */}
      <Editor
        originContent={originContent}
        originTitle={originTitle}
        articleId={articleId}
      ></Editor>
    </div>
  );
}

// export default observer(NewArticle);
export default NewArticle;

