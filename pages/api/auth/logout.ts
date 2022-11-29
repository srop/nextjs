
import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
} from "@/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import { clearCookie } from "@/utils/cookieUtil";

export default async function  (req: NextApiRequest, res: NextApiResponse<any>) {

    clearCookie(res, ACCESS_TOKEN_KEY);
    res.json({ result: "ok" });
}