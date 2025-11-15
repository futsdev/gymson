import type { ReactNode } from "react";

export type routerType = {
    title: string;
    path: string;
    element: ReactNode;
    layout: any;
    icon?: React.ComponentType<any>;
}