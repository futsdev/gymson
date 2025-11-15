import { useUserStore } from "@/stores/user-store"
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoutesRedirect = () => {
    const isAuthenticated = !!useUserStore(state => state.token)

    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />
}

export const PrivateRoutesRedirect = () => {
    const isAuthenticated = !!useUserStore(state => state.token)

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}