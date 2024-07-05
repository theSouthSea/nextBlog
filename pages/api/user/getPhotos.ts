"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { Photo } from "db/entity/photo";
import { AppDataSource } from "db/new";

export default async function getPhotos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /* 使用实体管理器entity manager示例 */
  // const savedPhotos = await AppDataSource.manager.find(Photo);
  // console.log("All photos from the db: ", savedPhotos);
  /* 使用实体仓库entity repository示例 */
  const photoRepository = AppDataSource.getRepository(Photo);
  /* 搜索全部 */
  const savedPhotos = await photoRepository.find();
  console.log("All photos from the db: ", savedPhotos);
  res.status(200).json({
    code: 0,
    msg: "获取成功",
    data: savedPhotos,
  });
}

