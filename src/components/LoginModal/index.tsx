import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
import CountDown from "../CountDown";
import { message } from "antd";
import request from "@/services/fetch";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
interface LoginModalProps {
  isShow: boolean;
  onClose: () => void;
}

function LoginModal(props: LoginModalProps) {
  const store = useStore();
  console.log("store=", store);
  const { isShow = false, onClose } = props;
  const [form, setForm] = useState({
    phone: "",
    verify: "",
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const handleVerifyCode = () => {
    // console.log("handleVerifyCode");
    if (!form.phone) {
      message.warning("请输入手机号");
      return;
    }
    // request.post("/api/user/sendVerifyCode",{
    //   PhoneNumbers: form.phone,
    //   SignName: '阿里云短信测试',
    //   TemplateCode: 'SMS_154950909',
    // })
    console.log("form", form);
    request
      .post("/api/user/sendVerifyCode", {
        to: form.phone,
        templateId: "1",
      })
      .then((res: any) => {
        console.log(res);
        if (res.code === 0) {
          message.success("发送成功");
          setIsShowVerifyCode(true);
        } else {
          message.error(res.msg || "发送失败");
        }
      });
    setIsShowVerifyCode(true);
  };
  const handleLogin = () => {
    // console.log("handleLogin");
    request
      .post("/api/user/login", {
        ...form,
        identity_type: "phone",
      })
      .then((res: any) => {
        if (res.code === 0) {
          message.success("登录成功");
          store.user.setUserInfo?.(res.data);
          onClose?.();
        } else {
          message.error(res.msg || "登录失败");
        }
      });
  };
  const handleOAuthGithub = () => {
    console.log("handleOAuthGithub");
    const githubClientId = "Ov23lizKsHWZgJq1CywL";
    const url = "http://localhost:3000/api/oauth/redirect";
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${url}`
    );
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };
  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div className={styles.loginTitleText}>手机号登录</div>
          <div className={styles.closeBtn} onClick={props.onClose}>
            X
          </div>
        </div>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleFormChange}
          placeholder="请输入手机号"
          maxLength={11}
          autoComplete="off"
          autoFocus
          className={styles.usernameInput}
        />
        <div className={styles.verifyCodeArea}>
          <input
            type="text"
            name="verify"
            value={form.verify}
            onChange={handleFormChange}
            placeholder="请输入验证码"
            maxLength={11}
            autoComplete="off"
            className={styles.usernameInput}
          />
          <span className={styles.verifyCode} onClick={handleVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd}></CountDown>
            ) : (
              "获取验证码"
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用github登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a
            href="https://github.com/yygmind/blog/issues/35"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
}

export default observer(LoginModal);

