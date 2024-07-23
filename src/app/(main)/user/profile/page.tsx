"use client";
import { Button, Form, Input, message } from "antd";
import styles from "./index.module.scss";
import { useEffect } from "react";
import request from "@/services/fetch";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const UserProfile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const store = useStore();
  const handleFinish = (values: any) => {
    // console.log("handleFinish-data=", data);
    // const { error, values } = data;
    request.post("/api/user/update", values).then((res: any) => {
      console.log("res=", res);
      if (res?.code === 0) {
        messageApi.success("修改成功");
        store.user.setUserInfo?.(res.data);
      }
    });
  };
  useEffect(() => {
    request.get("/api/user/detail").then((res: any) => {
      if (res?.code === 0) {
        form.setFieldsValue(res.data);
        console.log("res=", res);
      }
    });
  }, [form]);
  return (
    <div className="content-layout">
      {contextHolder}
      <div className={styles.userProfile}>
        <h2>个人资料</h2>
        <div>
          <Form {...layout} form={form} onFinish={handleFinish}>
            <Form.Item name="nickname" label="用户名">
              <Input placeholder="请输入用户名"></Input>
            </Form.Item>
            <Form.Item name="job" label="职位">
              <Input placeholder="请输入职位"></Input>
            </Form.Item>
            <Form.Item name="introduce" label="个人介绍">
              <Input placeholder="请输入个人介绍"></Input>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default observer(UserProfile);

