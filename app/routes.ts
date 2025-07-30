import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/userlist.tsx"),
  route("/add", "routes/adduser.tsx"),
] satisfies RouteConfig;
