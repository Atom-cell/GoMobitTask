import { lazy } from "react";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const AddUser = lazy(() => import("../views/AddUser.js"));
const ViewUsers = lazy(() => import("../views/ViewUsers.js"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      // { path: "/", element: <Navigate to="/starter" /> },
      { path: "/", exact: true, element: <AddUser /> },
      { path: "/view", exact: true, element: <ViewUsers /> },
    ],
  },
];

export default ThemeRoutes;
