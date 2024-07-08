import userStore, { IUserStore } from "./userStore";

export interface IRootStore {
  user: IUserStore;
}
const createStore = (initialValues: any): (() => IRootStore) => {
  return () => {
    return {
      user: {
        ...userStore(),
        ...initialValues?.user,
      },
    };
  };
};

export default createStore;

