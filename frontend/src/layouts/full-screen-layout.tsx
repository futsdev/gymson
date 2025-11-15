import React from 'react'

const FullScreenLayout = ({ children }) => {
    return (
        <div className='flex flex-col h-[100vh] w-[100vw]'>{children}</div>
    )
}

export default FullScreenLayout