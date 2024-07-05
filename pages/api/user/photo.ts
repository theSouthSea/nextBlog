import { NextApiRequest, NextApiResponse } from "next";
import { Photo } from "db/entity/photo";
import { AppDataSource } from "db/new";

export async function getPhotos() {
  const photos = await AppDataSource.manager.find(Photo);
  console.log("All photos from the db: ", photos);
}
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

  const saveRes = await AppDataSource.manager.save(photo);
  console.log("Photo has been saved. Photo id is", photo.id);
  console.log("saveRes=", saveRes);
  res.status(200).json({
    code: 0,
    msg: "添加成功",
    data: saveRes,
  });
}
