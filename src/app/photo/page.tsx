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
import "db/new";
import request from "@/services/fetch";
import { useEffect, useRef, useState } from "react";
import PhotoModal from "@/components/photo/PhotoModal";
import PhotoForm, { RefProps } from "@/components/photo/PhotoForm";

type FieldType = {
  name?: string;
  description?: string;
  filename?: string;
  views?: 0 | 1;
  isPublished?: boolean;
  loading?: boolean;
};
const count = 3;
export default function PhotoPage() {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FieldType[]>([]);
  const [list, setList] = useState<FieldType[]>([]);
  useEffect(() => {
    // 会调用两次,第一次会报错
    // request.get("/api/user/getPhotos").then((res: any) => {
    //   console.log(res);
    //   if (res.code === 0) {
    //     setData(res.data);
    //   }
    // });
    // 这样也会调用两次,第一次会报错
    setTimeout(() => {
      // request.get("/api/user/getPhotos").then((res: any) => {
      request.get("/api/user/photo").then((res: any) => {
        setInitLoading(false);
        console.log(res);
        if (res.code === 0) {
          setData(res.data);
          setList(res.data);
        }
      });
    }, 1000);
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: "",
          description: "",
        }))
      )
    );
    request.get("/api/user/photo").then((res: any) => {
      setLoading(false);
      console.log(res);
      if (res.code === 0) {
        const newData = data.concat(res.data);
        setData(newData);
        setList(newData);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event("resize"));
      }
    });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOk = () => {
    formModalRef.current?.submit();
    setOpen(false);
  };
  const handleSuccess = () => {
    console.log("成功");
  };
  const handleFailed = () => {
    console.log("失败");
  };
  const formModalRef = useRef<RefProps>();
  return (
    <div>
      <h1>Photo Page</h1>
      <div>
        <Button type="primary" onClick={() => setOpen(true)}>
          添加图片
        </Button>
        <PhotoModal open={open} onOk={handleOk} onClose={handleClose}>
          <PhotoForm
            ref={formModalRef}
            onSuccess={handleSuccess}
            onFailed={handleFailed}
            isModal
          ></PhotoForm>
        </PhotoModal>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={list}
        loadMore={loadMore}
        loading={initLoading}
        // renderItem={(item, index) => (
        //   <List.Item>
        //     <List.Item.Meta
        //       avatar={
        //         <Avatar
        //           src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
        //         />
        //       }
        //       title={<a href="https://ant.design">{item.name}</a>}
        //       description={item.description}
        //     />
        //   </List.Item>
        // )}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button type="link" key="list-loadmore-edit">
                edit
              </Button>,
              <Button type="link" key="list-loadmore-more">
                more
              </Button>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

