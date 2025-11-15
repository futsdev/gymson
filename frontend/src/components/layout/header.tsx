import React from 'react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useUserStore } from '@/stores/user-store'
import { Separator } from '@radix-ui/react-separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import PrivateRoutes from '@/routes/private-routes'


const ModeToggle = () => {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ProfileCard = () => {
    const user = useUserStore()

    if (!user.id) {
        return null
    }
    return (
        <HoverCard openDelay={100}>
            <HoverCardTrigger asChild>
                <Button variant="ghost" size={'icon'} className='rounded-full'>
                    <Avatar>
                        {/* TODO: change to user image */}
                        <AvatarImage src={'some-url' + user.id} alt={user.name} />
                        <AvatarFallback>
                            <User className="w-4 h-4" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80" align='end'>
                <div className="space-y-2">
                    <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-xs">{user.email}</p>
                        <p className="text-muted-foreground text-xs">{user.role}</p>
                    </div>
                    <Separator />
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => user.clearUserInfo()}
                    >Logout</Button>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

const Header = () => {
    return (
        <div className='flex items-center justify-between px-3 py-2'>
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">{PrivateRoutes.find(route => route.path === window.location.pathname)?.title}</h2>
            </div>
            {/* <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div> */}
            <div className="flex items-center gap-2">
                <ModeToggle />
                <ProfileCard />
            </div>
        </div>
    )
}

export default Header