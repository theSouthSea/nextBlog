"use client";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import Link from "next/link";

const EditButton = ({
  userId,
  articleId,
}: {
  userId: number;
  articleId: number;
}) => {
  const store = useStore();
  const id = store.user.userInfo.userId;
  return Number(userId) === Number(id) ? (
    <Link href={`/article/${articleId}/edit`}>编辑</Link>
  ) : null;
};
// export default EditButton
export default observer(EditButton);

