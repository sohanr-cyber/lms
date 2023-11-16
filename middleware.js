import { NextResponse } from "next/server";
// import { NextResponse } from "next/dist/server/web/spec-extension/response";
import url from "./configure";

export default function middleware(req) {
  let verify = req.cookies.get("userInfo");
  let uri = req.url;

  // not logged in
  if (!verify && uri.includes("/admin")) {
    return NextResponse.redirect(`${url}/login`);
  }

  //loged in but not admin
  if (
    verify &&
    JSON.parse(verify.value).user.role != "admin" &&
    uri.includes("/admin")
  ) {
    return NextResponse.redirect(`${url}/login`);
  }

  if (verify && uri.includes("/login")) {
    return NextResponse.redirect(`${url}`);
  }
}
