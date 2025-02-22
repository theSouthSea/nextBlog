"use client";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import Link from "next/link";

const EditButton = ({
  userId,
  articleId,
  className,
}: {
  userId: number;
  articleId: number;
  className: string;
}) => {
  const store = useStore();
  const id = store.user.userInfo.userId;
  return Number(userId) === Number(id) ? (
    <Link
      className={className}
      href={`/article/${articleId}/edit`}
      style={{ color: "blue" }}
    >
      编辑
    </Link>
  ) : null;
};
// export default EditButton
export default observer(EditButton);

