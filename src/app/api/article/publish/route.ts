import { NextApiRequest } from "next";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {}
export async function POST(req: NextApiRequest) {
  // const session = req.cookies.get('session');
  const data = await req.json();
  const { title = "", content = "" } = data;
  console.log("data=", data);
  return Response.json({
    code: 0,
    msg: "发布成功",
    data: {
      title,
      content,
    },
  });
}

