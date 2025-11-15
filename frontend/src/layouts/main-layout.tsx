import Header from '@/components/layout/header'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-[100vh] w-[100vw]'>
            <Header />
            <div className="flex grow overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default MainLayout