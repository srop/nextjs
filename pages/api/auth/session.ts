import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
} from "@/utils/constants";
import { clearCookie, setCookie } from "@/utils/cookieUtil";
import httpClient from "@/utils/httpClient";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies[ACCESS_TOKEN_KEY];
    console.log("accessToken:", accessToken);
    if (accessToken) {
      // const response = {
      //   data: {
      //     result: "ok",
      //     user: {
      //       token:
      //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibGV2ZWwiOiJub3JtYWwiLCJpYXQiOjE2Njk3MTMxNzR9.iG8sIQvjt_jRfDGfPQGtPrz8gdv6sHtRLHYQ4flUGVs",
      //       username: "admin",
      //       firstname: "Chaiyasit",
      //       lastname: "T.",
      //       email: "test@mail.com",
      //       image: "/default_image.jpg",
      //     },
      //   },
      // };
      const response = await httpClient.get(`/users/15`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    //  const response = await httpClient.get(`/users/15`);
      console.log("user--->", response.data);
      res.json(response.data);
    } else {
      res.json({ result: "nok" });
    }
  } catch (error: any) {
    res.json({ result: "nok" });
  }
}
