"use client";
import { Modal } from "antd";
import { ReactNode } from "react";

interface PhotoModalProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  children: ReactNode;
}
const PhotoModal = (props: PhotoModalProps) => {
  const { open, onOk, onClose, children } = props;
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      forceRender
      // okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
      onCancel={onClose}
      onOk={onOk}
      destroyOnClose
      // modalRender={(dom) => (
      //   <Form
      //     layout="vertical"
      //     form={form}
      //     name="form_in_modal"
      //     initialValues={{ modifier: 'public' }}
      //     clearOnDestroy
      //     onFinish={(values) => onCreate(values)}
      //   >
      //     {dom}
      //   </Form>
      // )}
    >
      {children}
    </Modal>
  );
};
export default PhotoModal;

