import React from "react";

import Home from './pages/Home/Home';
import Roles from './pages/Roles/Roles';
import Permission from './pages/Permission/Permission';
import AllowPermission from './pages/AllowPermission/AllowPermission';
import UsersList from './pages/UsersList/UsersList';
import Leaves from './pages/Leaves/Leaves';
import Announcement from './pages/Announcement/Announcement';
import Events from './pages/Events/Events';
import Reports from './pages/Reports/Reports';
import Attendence from './pages/Attendence/Attendence';
import EditUserDetail from './Component/UsersTable/EditUserDetail';
import Error from './pages/Error/Error';

const routes = [
    { path: "/home", exact: true, name: "Home", element: Home },
    { path: "/attendence", exact: true, name: "Attendence", element: Attendence },
    { path: "/roles", exact: true, name: "Roles", element: Roles },
    { path: "/permission", exact: true, name: "Permission", element: Permission },
    { path: "/allow-permission", exact: true, name: "AllowPermission", element: AllowPermission },
    { path: "/users-List", exact: true, name: "UsersList", element: UsersList },
    { path: "/editUserDetails/:id", exact: true, name: "EditUserDetail", element: EditUserDetail },
    { path: "/leaves", exact: true, name: "Leaves", element: Leaves },
    { path: "/announcement", exact: true, name: "Announcement", element: Announcement },
    { path: "/events", exact: true, name: "Events", element: Events },
    { path: "/reports", exact: true, name: "Reports", element: Reports },
    { path: "*", exact: true, name: "Error", element: Error },
];

export default routes;

