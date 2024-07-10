// 这些路由钩子在服务端组件中不可用
// 获取路径参数只能通过页面组件的props,也就是context来获取
// import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { AppDataSource, initDataSource } from "db";
import { Article } from "db/entity";
import styles from "./index.module.scss";
import { Avatar } from "antd";
// import { observer } from "mobx-react-lite";
// import { useStore } from "@/store";
// import Link from "next/link";
import MarkdownEffect from "markdown-to-jsx";
import EditButton from "./EditButton";
// import Comment from "./Comment";
// import CommentList from "./CommentList";
// import { IComment } from "pages/api";
import CommentAndList from "./CommentAndList";
export async function getData(data: any) {
  console.log("params=", data);
  const { articleId } = data;
  await initDataSource();
  const articleRepo = AppDataSource.getRepository(Article);
  const articleRes = await articleRepo.findOne({
    where: {
      id: articleId,
    },
    relations: ["user", "comments", "comments.user"],
  });
  console.log("articleRes=", articleRes);
  if (articleRes) {
    articleRes.views++;
    await articleRepo.save(articleRes);
  }
  return articleRes;
}
const list = [
  {
    id: 6,
    content: "加油努力",
    create_time: "2024-07-10T07:30:50.000Z",
    update_time: "2024-07-10T07:30:50.000Z",
    is_delete: 0,
    user: {
      id: 2,
      nickname: "用户_7227",
      job: "程序员",
      avatar: "/images/avatar.jpg",
      introduce: "这个人很懒，什么都没有留下",
    },
  },
];
const ArticleDetail = async (ctx: any) => {
  // console.log("ctx=", ctx);
  // { params: { articleId: '3' }, searchParams: {} }
  // console.log("ctx.params=", ctx.params);
  // articleId
  /* 不能在使用ctx的情况下使用observer,useStore */
  // const store = useStore();
  // const commentListRef = useRef<RefProps>(null);
  // const handleCommentSuccess = (data: IComment) => {
  //   commentListRef.current?.setCommentList(data);
  // };
  const params = ctx.params;
  // const router = useRouter();
  // const params = useSearchParams();
  // const pathname = usePathname();
  // console.log("router=", router);
  // console.log("params=", params);
  // console.log("pathname=", pathname);
  const article = await getData(params);
  const {
    id: articleId,
    title,
    content,
    create_time,
    views,
    update_time,
    user,
    comments,
  } = article || {};
  const { nickname, avatar, id } = user || {};
  // console.log("comments=", comments);
  const commentsStr = JSON.stringify(comments);
  return (
    <div>
      <div className="content-layout">
        <div className={styles.title}>title</div>
        <div className={styles.user}>
          <Avatar src={avatar} size={50}></Avatar>
          <div className={styles.info}>
            <div className={styles.name}>{nickname}</div>
            <div className={styles.time}>
              <div>{update_time?.toLocaleString()}</div>
              <div>阅读量:{views}</div>
              {/* {Number(userId) === Number(id) && (
                <Link href={`/article/${params.articleId}/edit`}>编辑</Link>
              )} */}
              {id && (
                <EditButton
                  userId={id}
                  articleId={params.articleId}
                  className="link"
                ></EditButton>
              )}
            </div>
          </div>
        </div>
        <MarkdownEffect className={styles.markdown}>
          {content || ""}
        </MarkdownEffect>
      </div>
      <div className={styles.divider}></div>
      {/* <div className="content-layout">
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
      </div> */}
      <CommentAndList
        articleId={articleId!}
        avatar={avatar!}
        commentsStr={commentsStr}
      ></CommentAndList>
    </div>
  );
};
// export default observer(ArticleDetail);
export default ArticleDetail;

// `pages` directory
/* page router中服务端渲染的写法 */
// export async function getServerSideProps({params}:any) {
//   const {id} = params;
//   const res = await fetch(`/api/article/${id}`)
//   const projects = await res.json()

//   return { props: { projects } }
// }

// export default function Dashboard({ projects }) {
//   return (
//     <ul>
//       {projects.map((project) => (
//         <li key={project.id}>{project.name}</li>
//       ))}
//     </ul>
//   )
// }

