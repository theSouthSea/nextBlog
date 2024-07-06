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

  const firstPhoto = await photoRepository.findOneBy({
    id: 1,
  });
  console.log("First photo from the db: ", firstPhoto);

  const meAndBearsPhoto = await photoRepository.findOneBy({
    name: "Me and Bears",
  });
  console.log("Me and Bears photo from the db: ", meAndBearsPhoto);

  const allViewedPhotos = await photoRepository.findBy({ views: 1 });
  console.log("All viewed photos: ", allViewedPhotos);

  const allPublishedPhotos = await photoRepository.findBy({
    isPublished: true,
  });
  console.log("All published photos: ", allPublishedPhotos);

  const [photos, photosCount] = await photoRepository.findAndCount();
  console.log("All photos: ", photos);
  console.log("Photos count: ", photosCount);
  res.status(200).json({
    code: 0,
    msg: "获取成功",
    data: savedPhotos,
  });
}

