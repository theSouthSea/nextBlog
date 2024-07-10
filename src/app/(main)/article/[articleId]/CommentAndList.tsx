"use client";
import { Divider } from "antd";
import Comment from "./Comment";
import CommentList, { RefProps } from "./CommentList";
import { IComment } from "pages/api";
import { useRef } from "react";

interface CommentAndListProps {
  articleId: number;
  avatar: string;
  // comments: IComment[];
  commentsStr: string;
}
const CommentAndList = ({
  articleId,
  avatar,
  commentsStr,
}: CommentAndListProps) => {
  const comments = JSON.parse(commentsStr);
  const commentListRef = useRef<RefProps>(null);
  const handleCommentSuccess = (data: IComment) => {
    commentListRef.current?.setList(data);
  };
  console.log("CommentAndList-render");
  return (
    <div className="content-layout">
      <h3>评论</h3>
      {articleId && (
        <Comment
          avatar={avatar}
          articleId={articleId}
          onSuccess={handleCommentSuccess}
        ></Comment>
      )}
      <Divider></Divider>
      <CommentList comments={comments!} ref={commentListRef!}></CommentList>
    </div>
  );
};
export default CommentAndList;

