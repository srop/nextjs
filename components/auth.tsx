import React from 'react'
import cookie from "cookie"
type Props = {}

export default function parseCookies(req:any){
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}