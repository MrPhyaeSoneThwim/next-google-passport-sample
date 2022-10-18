import { setCookies } from "cookies-next";
import passport from "passport";
import connect from "../../../lib/database";
import "../../../lib/passport";

export default async function (req, res, next) {
  await connect();
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res.redirect("http://localhost:3000/?a=auth_fail");
    }

    console.log("User Data", user);
    console.log("Info Data", info);

    // set cookie and send redirect
    setCookies("token", info.token, {
      req,
      res,
    });
    setCookies("userinfo", user, { req, res });
    res.redirect("http://localhost:3000/dashboard");
  })(req, res, next);
}
