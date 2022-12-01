/* eslint-disable import/no-anonymous-default-export */
import { serialize } from "cookie";
import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
} from "@/utils/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import httpClient from "@/utils/httpClient";
import { clearCookie, setCookie } from "@/utils/cookieUtil";
export default async function Login(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let response = {
    data: {
      result: "",
      user: {
        token: "",
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        image: "",
      },
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibGV2ZWwiOiJub3JtYWwiLCJpYXQiOjE2Njk3MTMxNzR9.iG8sIQvjt_jRfDGfPQGtPrz8gdv6sHtRLHYQ4flUGVs",
  };
  if (req.body.username === "admin" && req.body.password === "admin") {
    response = {
      data: {
        result: "ok",
        user: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibGV2ZWwiOiJub3JtYWwiLCJpYXQiOjE2Njk3MTMxNzR9.iG8sIQvjt_jRfDGfPQGtPrz8gdv6sHtRLHYQ4flUGVs",
          username: "admin",
          firstname: "Chaiyasit",
          lastname: "T.",
          email: "test@mail.com",
          image: "/default_image.jpg",
        },
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibGV2ZWwiOiJub3JtYWwiLCJpYXQiOjE2Njk3MTMxNzR9.iG8sIQvjt_jRfDGfPQGtPrz8gdv6sHtRLHYQ4flUGVs",
    };
  } else if (req.body.username === "user" && req.body.password === "user") {
    response = {
      data: {
        result: "ok",
        user: {
          token:
            "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          username: "user",
          firstname: "chanika",
          lastname: "T.",
          email: "user@mail.com",
          image: "/default_image.jpg",
        },
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwibGV2ZWwiOiJub3JtYWwiLCJpYXQiOjE2Njk3MTMxNzR9.iG8sIQvjt_jRfDGfPQGtPrz8gdv6sHtRLHYQ4flUGVs",
    };
  } else {
    res.json({ message: "Invalid credentials!" });
    res.status(400).end();
  }
  try {
    // const response = await httpClient.post(`/authen/login`, req.body);

    //   const { token } = response.token;

    setCookie(res, ACCESS_TOKEN_KEY, response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.json(response.data);
  } catch (error: any) {
    res.json({ message: "Invalid credentials!" });
    res.status(400).end();
  }
}
