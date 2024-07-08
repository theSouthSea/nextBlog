export interface IUserInfo {
  userId: number;
  nickname: string;
  avatar: string;
  job: string;
  introduce: string;
  // photos: IPhoto[];
}
export interface IUserStore {
  userInfo: Partial<IUserInfo>;
  setUserInfo: (userInfo: IUserInfo) => void;
}
const userStore = (): IUserStore => {
  return {
    userInfo: {},
    setUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo;
    },
  };
};
export default userStore;

