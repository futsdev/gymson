import { ApertureIcon, AudioWaveform, Calendar, Command, GalleryVerticalEnd, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { Link } from "react-router-dom"
import PrivateRoutes from "@/routes/private-routes"

const teams = [
    {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
    },
    {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
    },
    {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
    },
]

function AppSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <TeamSwitcher teams={teams} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel><ApertureIcon /> Group name</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {PrivateRoutes.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild
                                        tooltip={item.title}
                                        isActive={window.location.pathname === item.path}
                                    // className="px-2.5 md:px-2"
                                    >
                                        <Link to={item.path}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar