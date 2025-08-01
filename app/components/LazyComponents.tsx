import { lazy } from "react";

export const LazyUserTable = lazy(() => import("./UserTable"));
export const LazyAddUserForm = lazy(() => import("./AddUserForm"));
export const LazyModal = lazy(() => import("./Modal"));
