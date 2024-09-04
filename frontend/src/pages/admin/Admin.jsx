import { Outlet, Route, Routes } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import ManageCategory from "./ManageCategory";

function Admin() {
    return (
        <>
            <AdminHeader />
            <Outlet />
        </>
    )
}
export default Admin