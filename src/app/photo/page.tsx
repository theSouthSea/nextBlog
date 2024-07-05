"use client";
import { Button, Checkbox, Form, FormProps, Input, message, Radio } from "antd";
import "db/new";
import request from "@/services/fetch";

type FieldType = {
  name?: string;
  description?: string;
  filename?: string;
  views?: 0 | 1;
  isPublished?: boolean;
};
export default function PhotoPage() {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    request.post("/api/user/photo", values).then((res: any) => {
      if (res.code === 0) {
        message.success("提交成功");
      } else {
        message.error("提交失败");
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>Photo Page</h1>
      <h2>添加图片</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your photo name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="description"
          name="description"
          rules={[
            { required: true, message: "Please input your photo description!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="filename"
          name="filename"
          rules={[
            { required: true, message: "Please input your photo filename!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="views"
          name="views"
          rules={[{ required: true, message: "Please input your views!" }]}
        >
          <Radio.Group>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item<FieldType>
          name="isPublished"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

