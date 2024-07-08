"use client";
import { createContext, ReactElement, useContext } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import createStore, { IRootStore } from "./rootStore";
// 开启服务端渲染支持
enableStaticRendering(!process.browser);
const StoreContext = createContext({});
interface IProps {
  children: ReactElement;
  // initialValues: Record<any,any>
  initialValues: any;
}
export const StoreProvider = ({ children, initialValues }: IProps) => {
  const store = useLocalObservable(createStore(initialValues));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IRootStore = useContext(StoreContext) as IRootStore;
  if (!store) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return store;
};

