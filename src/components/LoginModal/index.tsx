import { ChangeEvent, useState } from "react";
import styles from "./index.module.scss";
import CountDown from "../CountDown";
interface LoginModalProps {
  isShow: boolean;
  onClose: () => void;
}

export default function LoginModal(props: LoginModalProps) {
  const { isShow = false } = props;
  const [form, setForm] = useState({
    phone: "",
    verify: "",
  });
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const handleVerifyCode = () => {
    // console.log("handleVerifyCode");
    setIsShowVerifyCode(true);
  };
  const handleLogin = () => {
    console.log("handleLogin");
  };
  const handleOAuthGithub = () => {
    console.log("handleOAuthGithub");
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
            autoFocus
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

