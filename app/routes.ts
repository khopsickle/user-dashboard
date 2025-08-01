import { type RouteConfig, index, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  index("routes/userlist.tsx"),
  route("/add", "routes/adduser.tsx"),
];

export default routes;
