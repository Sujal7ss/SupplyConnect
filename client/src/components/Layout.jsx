import { Outlet } from "react-router"

export default function Layout(){
    return <div class="bg-gray-100 flex items-center justify-center min-h-screen">
        <Outlet />
    </div>
}