import { NextApiRequest, NextApiResponse } from "next";
import request from "@/services/fetch";
import dayjs from "dayjs";
import md5 from "md5";
import { encode } from "js-base64";
// iron-session v6,v7获取session设置session
// import {withIronSessionApiRoute} from 'iron-session/next'
// iron-session v8获取session设置session
import { getIronSession } from "iron-session";
import { ironOptions } from "@/config";
import { ISession } from "..";
// import { cookies } from "next/headers";
export default async function sendVerifyCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: ISession = await getIronSession(req, res, ironOptions);
  // const cookiesRes = cookies();
  // const cookies = req.cookies;
  // const session = await getIronSession<ISession>(cookies, ironOptions);
  console.log("verify-session=", session);
  const { to = "", templateId = "1" } = req.body;
  console.log("req.body=", req.body);
  const baseUrl = "https://app.cloopen.com:8883";
  // const bizUrl =
  //   "/2013-12-26/Accounts/{accountSid}/SMS/{funcdes}?sig={SigParameter}";
  const accountSid = "2c94811c9035ff9f01907e289a5e10d1";
  const funcdes = "TemplateSMS";
  // const timestamp = dayjs().format("yyyyMMddHHmmss");
  // timestamp= yyyy07Th231028
  const timestamp = dayjs().format("YYYYMMDDHHmmss");
  console.log("timestamp=", timestamp);
  const accountKey = "ddc671222d424d2d915548ec540d259d";
  const SigParameter = md5(`${accountSid}${accountKey}${timestamp}`);
  console.log("SigParameter=", SigParameter);
  const Authorization = encode(`${accountSid}:${timestamp}`);
  console.log("Authorization=", Authorization);
  // 随机数不够准确
  // const verifyCode2 = Math.floor(Math.random()*(9999 - 1000)+1000);
  // 获取1000到9999的随机数
  const verifyCode = Math.floor(Math.random() * 9000 + 1000);
  console.log("verifyCode=", verifyCode);
  const expireMinute = "5";
  const appId = "2c94811c9035ff9f01907e289bfc10d8";
  const requestUrl = `${baseUrl}/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${SigParameter}`;
  interface IResData {
    statusCode: string;
    statusMsg: string;
    templateSMS?: {
      smsMessageSid: string;
      dateCreated: string;
    };
  }
  const response = await request.post<any, IResData>(
    requestUrl,
    {
      to,
      appId,
      templateId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );
  console.log("response=", response);
  const { statusMsg, statusCode, templateSMS } = response;
  if (statusCode === "000000") {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      msg: statusMsg || "发送成功",
      data: templateSMS,
    });
  } else {
    res.status(200).json({
      code: 200,
      msg: statusMsg || "未知错误",
      data: statusCode,
    });
  }
  // 阿里云短信验证
  // if(res.Code === 'OK'){
  //   message.success("发送成功");
  //   setIsShowVerifyCode(true);
  // }else{
  //   message.error(res.Message || "发送失败");
  // }
}

