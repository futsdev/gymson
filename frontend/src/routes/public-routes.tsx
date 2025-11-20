import type { routerType } from "@/types/router.types";
import * as Page from "@/pages";
import FullScreenLayout from "@/layouts/full-screen-layout";

const PublicRoutes: routerType[] = [
    {
        title: "Login",
        path: "/login",
        element: <Page.Login />,
        layout: FullScreenLayout,
    }
];

export default PublicRoutes