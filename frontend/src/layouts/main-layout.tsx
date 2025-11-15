import Header from '@/components/layout/header'
import React from 'react'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import SideBar from "@/components/layout/sidebar"

const MainLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    return (
        <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <div className='flex flex-col h-[100vh] w-[100vw]'>
                <div className="flex grow overflow-hidden">
                    <SideBar />
                    <SidebarInset>
                        <Header />
                        <div className="flex flex-col grow overflow-auto px-3">
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default MainLayout