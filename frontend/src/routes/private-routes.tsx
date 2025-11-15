import type { routerType } from "@/types/router.types";
import * as Page from "@/pages";
import MainLayout from "@/layouts/main-layout";

const PrivateRoutes: routerType[] = [
    {
        title: "Subscriptions",
        path: "/subscriptions",
        element: <Page.Subscriptions />,
        layout: MainLayout,
    }
];

export default PrivateRoutes