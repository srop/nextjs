import axios from "axios";
import { SignUp, SignIn, GetSession } from "@/models/auth.model";
import { UserData } from "@/models/user.model";
import httpClient from "@/utils/httpClient";
//import { setCookie } from "@/utils/cookieUtil";
import cookie from "cookie";
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

// export const signIn = async (user: signProps) => {
//   const { data: response } = await httpClient.post<SignIn>(
//     `/authen/login`,
//     user,
//     {
//       baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
//     }
//   );
//   return response;
// };

export const signIn = async (user: signProps): Promise<SignIn> => {

  const response = await httpClient.post<SignIn>(`/auth/login`, user, {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
};
export const signOut = async () => {
  const response = await httpClient.get(`/auth/logout`,{
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
}
export const getSession = async ():Promise<GetSession> => {
  const response = await httpClient.get(`/auth/session`,{
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
  });
  return response.data;
}