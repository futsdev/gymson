import type { routerType } from "@/types/router.types";
import * as Page from "@/pages";
import MainLayout from "@/layouts/main-layout";
import { Calendar, Dumbbell, Home, Inbox, Settings, User } from "lucide-react";

const PrivateRoutes: routerType[] = [
    {
        title: "Dashboard",
        path: "/",
        element: <Page.Dashboard />,
        layout: MainLayout,
        icon: Home,
    },
    {
        title: "Gyms",
        path: "/gyms",
        element: <Page.Gyms />,
        layout: MainLayout,
        icon: Dumbbell,
    },
    {
        title: "Users",
        path: "/users",
        element: <Page.Users />,
        layout: MainLayout,
        icon: User,
    },
    {
        title: "Roles",
        path: "/roles",
        element: <Page.Users />,
        layout: MainLayout,
        icon: User,
    },
    {
        title: "Subscriptions",
        path: "/subscriptions",
        element: <Page.Subscriptions />,
        layout: MainLayout,
        icon: Inbox,
    },
    {
        title: "Calendar",
        path: "/calendar",
        element: <Page.Users />,
        layout: MainLayout,
        icon: Calendar,
    },
    {
        title: "Settings",
        path: "/settings",
        element: <Page.Users />,
        layout: MainLayout,
        icon: Settings,
    },
];

export default PrivateRoutes