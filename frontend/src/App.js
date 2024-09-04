import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import axios from "axios";
import ErrorPage from "./pages/ErrorPage";
import Admin from "./pages/admin/Admin";
import ManageCategory from "./pages/admin/ManageCategory";
import ManageOrder from "./pages/admin/ManageOrder";

function App() {
    const user = useAuth()
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} errorElement={<ErrorPage />} />
                {/* <Route path='/:category' element={<Home />} /> */}
                <Route path='/' element={user ? <Navigate to="/" replace /> : <Outlet />}>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                {/* <Route path='/' element={(!user && user?.role !== 'user') ? <Navigate to="/" replace /> : <Outlet />}>
                    <Route path='/messages/:hotelId' element={<ChatBox />} />
                    <Route path='/messages' element={<Message />} />
                    <Route path='/my-bookings' element={<MyBookings />} />
                </Route> */}
                <Route path='admin/' element={(!user) ? <Navigate to="/signin" replace /> : <Admin />}>
                    <Route path="category" element={<ManageCategory />} />
                    <Route path="order" element={<ManageOrder />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
