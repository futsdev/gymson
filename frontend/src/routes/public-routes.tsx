import type { routerType } from "@/types/router.types";
import * as Page from "@/pages";
import MainLayout from "@/layouts/main-layout";

const PublicRoutes: routerType[] = [
    {
        title: "Login",
        path: "/login",
        element: <Page.Login />,
        layout: MainLayout,
    }
];

export default PublicRoutes