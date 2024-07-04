import { mock } from "mockjs";
export default function handler(req: any, res: any) {
  // res.status(200).json({ message: 'Hello, World 2!' });
  res.status(200).json(
    mock({
      "list|1-10": [
        {
          "id|+1": 1,
          name: "@cname",
          "age|18-30": 1,
          address: "@county(true)",
        },
      ],
    })
  );
}

