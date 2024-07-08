import { NextApiRequest, NextApiResponse } from "next";
import { ISession } from "..";
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { Cookie } from "next-cookie";
import { clearCookies } from "@/utils";

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  const cookies = Cookie.fromApiRoute(req, res);
  await session.destroy();
  // cookies.set('userId','');
  // cookies.set('nickname','');
  // cookies.set('avatar','');
  clearCookies(cookies);
  // res.setHeader('Set-Cookie','token=; Max-Age=0');
  res.status(200).json({ code: 0, msg: "退出成功", data: null });
}
