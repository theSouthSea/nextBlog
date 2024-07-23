"use client";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { ITag } from "pages/api";
import { useEffect, useState } from "react";
import request from "@/services/fetch";
import { Tabs, TabsProps } from "antd";
import styles from "./index.module.scss";
import TagList from "./TagList";
import { log } from "console";

function TagPage() {
  const store = useStore();
  const [followTags, setFollowTags] = useState<ITag[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const { userId } = store?.user?.userInfo;
  console.log("store?.user?.userInfo=", userId);
  const [isForceUpdate, setIsForceUpdate] = useState(false);
  useEffect(() => {
    request.get("/api/tag/get").then((res: any) => {
      if (res.code === 0) {
        const { allTags = [], followTags = [] } = res.data;
        setFollowTags(followTags);
        setAllTags(allTags);
      }
    });
  }, [isForceUpdate]);
  const handleChange = () => {
    setIsForceUpdate(!isForceUpdate);
  };
  const handleSelectedChange = (key: string) => {
    console.log("handleSelectedChange", key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "已关注的标签",
      className: styles.tags,
      children: (
        <TagList
          list={followTags}
          userId={userId}
          onChange={handleChange}
        ></TagList>
      ),
    },
    {
      key: "2",
      label: "全部标签",
      className: styles.tags,
      children: (
        <TagList
          list={allTags}
          userId={userId}
          onChange={handleChange}
        ></TagList>
      ),
    },
  ];
  return (
    <div>
      <h1>标签管理页面</h1>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={handleSelectedChange}
      />
    </div>
  );
}
export default observer(TagPage);

