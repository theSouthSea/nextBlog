"use client";
import { memo, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { IArticle, ITag } from "pages/api";
import classNames from "classnames";
import request from "@/services/fetch";
import { IActionRunInfo } from "mobx";
import Articles from "./Articles";
interface TagTabsProps {
  tags: ITag[];
  // onTagChange: (data: IArticle[]) => void;
  articles: IArticle[];
}
const TagTabs = ({ tags, articles }: TagTabsProps) => {
  const [selectedId, setSelectedId] = useState(0);
  const [showArticle, setShowArticle] = useState<IArticle[]>([...articles]);

  const handleSelectChange = (e: any) => {
    const tagId = e.target.dataset.tagid;
    setSelectedId(Number(tagId));
  };

  useEffect(() => {
    request.get(`/api/article/get?tag_id=${selectedId}`).then((res: any) => {
      if (res?.code === 0) {
        setShowArticle(res?.data);
      }
    });
  }, [selectedId]);
  return (
    <>
      <div className={styles.tags} onClick={handleSelectChange}>
        {tags?.map((tag) => {
          return (
            <div
              key={tag.id}
              data-tagid={tag.id}
              className={classNames(
                styles.tag,
                selectedId === tag.id ? styles.active : ""
              )}
            >
              {tag.title}
            </div>
          );
        })}
      </div>
      <Articles articles={showArticle}></Articles>
    </>
  );
};
export default memo(TagTabs);

