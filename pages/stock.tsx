import Layout from "@/components/Layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector, resetUsername, signUp } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/components/withAuth";
type Props = {};
const Stock = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  //const useSelector = useSelector((store:any)=>store.user)

  return <Layout>Stock </Layout>;
}
export default withAuth(Stock)
