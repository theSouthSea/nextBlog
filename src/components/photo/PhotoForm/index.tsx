"use client";
import {
  Avatar,
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  List,
  message,
  Radio,
  Skeleton,
} from "antd";
import request from "@/services/fetch";
import { forwardRef, Ref, useImperativeHandle, useState } from "react";
interface PhotoFormProps {
  onSuccess: () => void;
  onFailed: () => void;
  isModal?: boolean;
  isDetail?: boolean;
}
type FieldType = {
  name?: string;
  description?: string;
  filename?: string;
  views?: 0 | 1;
  isPublished?: boolean;
};
export type RefProps = {
  submit: () => void;
  setForm: (value: FieldType, isDetail?: boolean) => void;
  resetForm: () => void;
};
const PhotoFormFn = (props: PhotoFormProps, ref: Ref<RefProps>) => {
  const { onSuccess, onFailed, isModal = false, isDetail = false } = props;
  const [isFormDetail, setIsFormDetail] = useState<boolean>(isDetail);
  const [isCreate, setIsCreate] = useState(false);
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // values只有Form中Form.Item中的数据,通过form.setFieldsValue(value);设置的额外数据如何获取
    // 可以通过form.getFieldsValue();获取
    const allValues = form.getFieldsValue();
    console.log("Success-values:", values);
    console.log("Success-allValues:", allValues);
    const reqType = isCreate ? "post" : "put";
    request[reqType]("/api/user/photo", allValues).then((res: any) => {
      if (res.code === 0) {
        message.success("提交成功");
        onSuccess?.();
      } else {
        message.error("提交失败");
        onFailed?.();
      }
    });
  };
  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
    setForm: (value: FieldType, type?: boolean) => {
      form.setFieldsValue(value);
      setIsCreate(false);
      // if (typeof type !== "undefined") {
      if (type !== undefined) {
        setIsFormDetail(type);
      }
    },
    resetForm: () => {
      form.resetFields();
      setIsCreate(true);
    },
  }));

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={isFormDetail}
      form={form}
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

      {!isModal && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
const PhotoForm = forwardRef<any, PhotoFormProps>(PhotoFormFn);
export default PhotoForm;

