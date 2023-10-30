import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getUser } from "../utils/userData"

function ProtectedRoute() {
    if (!getUser()) {
        return <Navigate to="/login" />
    }
    return < Outlet />
}

export default ProtectedRoute