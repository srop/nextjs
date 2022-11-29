import Layout from "@/components/Layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector, resetUsername, signUp } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/components/withAuth";
type Props = {};
const Home = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  //const useSelector = useSelector((store:any)=>store.user)

  return <Layout>Home </Layout>;
}
export default withAuth(Home)
