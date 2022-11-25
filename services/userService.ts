import axios from "axios";
import { SignUp, SignIn } from "@/models/auth.model";
import { UserData } from "@/models/user.model";
import httpClient from "@/utils/httpClient";
import { setCookie } from "@/utils/cookieUtil";
import {
  HTTP_METHOD_POST,
  HTTP_METHOD_GET,
  ACCESS_TOKEN_KEY,
} from "@/utils/constants";
import { NextApiResponse } from "next";
type signProps = {
  username: string;
  password: string;
};
export const signUp = async (user: signProps): Promise<SignUp> => {
  const response = await httpClient.post<SignUp>(`/authen/register`, user);
  return response.data;
};

export const signIn = async (user: signProps): Promise<SignIn> => {
  const response = await httpClient.post<SignIn>(`/authen/login`, user);
  console.log(response);
  setCookie(response, ACCESS_TOKEN_KEY, response.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
  });
  return response.data;
};
