import { NextApiRequest, NextApiResponse } from "next";
import { Photo } from "db/entity/photo";
import { AppDataSource } from "db/new";

// export async function getPhotos() {
//   const photos = await AppDataSource.manager.find(Photo);
//   console.log("All photos from the db: ", photos);
// }
export default async function addPhoto(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, description, filename, views, isPublished } = req.body;
  const photo = new Photo();
  photo.name = name || "Me and Bears";
  photo.description = description || "I am near polar bears";
  photo.filename = filename || "photo-with-bears.jpg";
  photo.views = views || 1;
  photo.isPublished = isPublished || true;
  try {
    /* 实体管理器EntityManager使用示例 */
    // const saveRes = await AppDataSource.manager.save(photo);
    // console.log("saveRes=", saveRes);
    // console.log("Photo has been saved. Photo id is", photo.id);
    /* 仓库Repository使用示例 */
    const photoRepository = AppDataSource.getRepository(Photo);
    /* 保存 */
    const saveRes = await photoRepository.save(photo);
    console.log("Photo has been saved");
    /* 搜索全部 */
    const savedPhotos = await photoRepository.find();
    console.log("All photos from the db: ", savedPhotos);

    res.status(200).json({
      code: 0,
      msg: "添加成功",
      data: saveRes,
    });
  } catch (err) {
    console.log("err=", err);
    res.status(200).json({
      code: -1,
      msg: "添加失败",
      data: err,
    });
  }
}
