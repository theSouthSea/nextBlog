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
