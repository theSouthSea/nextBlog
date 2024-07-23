export const EXCEPTION_USER = {
  NOT_LOGIN: {
    code: 1001,
    msg: "用户未登录",
  },
  NOT_EXIST: {
    code: 1002,
    msg: "用户不存在",
  },
  PASSWORD_ERROR: {
    code: 1003,
    msg: "密码错误",
  },
  USER_EXIST: {
    code: 1004,
    msg: "用户已存在",
  },
};
export const EXCEPTION_ARTICLE = {
  PUBLISH_FAIL: {
    code: 2001,
    msg: "发布失败",
  },
  UPDATE_FAIL: {
    code: 2002,
    msg: "更新失败",
  },
  // UPDATE_SUCCESS: {
  //   code: 6002, // 成功默认是0
  //   msg: "更新成功",
  // },
  NoT_FOUND: {
    code: 2003,
    msg: "文章未找到",
  },
};

export const EXCEPTION_COMMENT = {
  PUBLISH_FAIL: {
    code: 3001,
    msg: "发布失败",
  },
  UPDATE_FAIL: {
    code: 3002,
    msg: "更新失败",
  },
};

export const EXCEPTION_TAG = {
  FOLLOW_FAIL: {
    code: 4001,
    msg: "关注失败",
  },
  UNFOLLOW_FAIL: {
    code: 4002,
    msg: "取消关注失败",
  },
};
