import Layout from "@/components/Layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { userSelector, resetUsername } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/store/store";
import withAuth from "@/components/withAuth";

type Props = {};
const Index = ({}: Props) => {
  const user = useSelector(userSelector);
  const dispatch = useAppDispatch();
  //const useSelector = useSelector((store:any)=>store.user)

  return <></>;
}
export default withAuth(Index)