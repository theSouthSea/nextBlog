import { Photo } from "db/entity/photo";
import { AppDataSource } from "db/new";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let resMsg = "操作成功";
  let resData = null;
  try {
    const photoRepository = AppDataSource.getRepository(Photo);
    // console.log("photoRepository.metadata=", photoRepository.metadata);
    if (req.method === "DELETE") {
      // Here, you would typically delete the post from the database.
      // For this example, we're just simulating the deletion.
      const delId = Number(req.query.id as string);
      console.log("typeof delId=", typeof delId, delId);
      // 下面一行报错,是Mysql: err= EntityMetadataNotFoundError: No metadata for "Photo" was found.
      // 原因是,Photo实体类中没有定义id属性,而是定义了id: number;
      // const photoToRemove = await photoRepository.findOne({
      //   where: { id: delId },
      // });
      const photoToRemove = await photoRepository.findOneBy({
        id: delId,
      });
      console.log("photoToRemove=", photoToRemove, delId);
      if (photoToRemove) {
        await photoRepository.remove(photoToRemove);
      }
      resMsg = "删除成功";
      // res.status(200).json({ message: `Post ${id} deleted` });
      res.status(200).json({
        code: 0,
        msg: resMsg,
        data: resData,
      });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (err) {
    console.log("err-photo-delete=", err);
    res.status(200).json({
      code: -1,
      msg: "删除失败",
      data: err,
    });
  }
}

