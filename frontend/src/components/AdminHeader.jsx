import { NavLink } from "react-router-dom"

function AdminHeader() {
    return (
        <div className="container mx-auto py-4 flex flex-wrap items-center gap-4">
            <NavLink className={"text-sm font-bold text-gray-400"} to={`category`}>Manage Category</NavLink>
            <NavLink className={"text-sm font-bold text-gray-400"} to={`order`}>Manage Orders</NavLink>
        </div>
    )
}
export default AdminHeader