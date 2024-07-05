declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_TYPE: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_USERNAME: string;
      DATABASE_PASSWORD: string;
      DATABASE_DATABASE: string;
      DATABASE_SYNCHRONIZE: boolean;
      SESSION_COOKIE_NAME: string;
      SESSION_PASSWORD: string;
      // 其他环境变量也可以在这里声明
    }
  }
}

// 不要忘了导出，以便在其他地方可以使用
export {};

