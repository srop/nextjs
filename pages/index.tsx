import Layout from "@/components/Layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector, resetUsername, signUp } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
interface Props {
  children: any;
}
export default function Index({}: Props) {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  //const useSelector = useSelector((store:any)=>store.user)

  return <Layout>ddds {user.username} </Layout>;
}
