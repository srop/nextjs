/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
} from "@/utils/constants";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import httpClient from "@/utils/httpClient";
import { clearCookie, setCookie } from "@/utils/cookieUtil";
export default async function Login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    console.log("server")
    const response = await httpClient.post(`auth/login`, req.body);
    console.log("api res", response.data);
    setCookie(res, ACCESS_TOKEN_KEY, response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.json(response.data);
  } catch (error: any) {
    res.status(400).end();
  }
}
