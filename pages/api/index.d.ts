import { IronSession } from "iron-session";
export type ISession = IronSession & {
  verifyCode?: string;
};
export type IUserAuth = {
  id: number;
  identity_type: string;
  identifier: string;
  credential: string;
  user: User;
};
export type IUser = {
  id: number;
  nickname: string;
  job: string;
  avatar: string;
  introduce: string;
};
export type IArticle = {
  id: number;
  title: string;
  content: string;
  create_time: Date;
  update_time: Date;
  views: number;
  is_delete: number;
  user: IUser;
};
export type IComment = {
  id: number;
  content: string;
  create_time: Date;
  update_time: Date;
  is_delete: number;
  user: IUser;
  article: IArticle;
};

export type ITag = {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  articles: IArticle[];
  users: IUser[];
};
