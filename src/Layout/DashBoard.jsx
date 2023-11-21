import { NavLink, Outlet } from "react-router-dom";
import {  FaAd, FaBook, FaCalendar, FaEnvelope, FaHome,  FaList, FaSearchMinus, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa'
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
    const [cart] = useCart()

    const [isAdmin] = useAdmin()

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-500 ">
                <ul className="menu p-3 mt-24 space-y-3">
                    {
                        isAdmin ? <>
                            <li>

                                <NavLink to="/dashboard/adminHome"> <FaHome />Admin Home</NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/addItems"> <FaUtensils />Add Items</NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/manageItems"> <FaList />Manage Items</NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/bookings"> <FaBook />Manage Booking</NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/Users"> <FaUsers />All Users</NavLink>
                            </li>

                        </>
                            :
                            <>
                                <li>

                                    <NavLink to="/dashboard/userHome"> <FaHome />User Home</NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/history"> <FaCalendar />PaymentHistory</NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/cart"> <FaShoppingCart />My Cart</NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/review"> <FaAd />Add A Review</NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/paymentHistory"> <FaList />PaymentHistory</NavLink>
                                </li>
                            </>
                    }
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>

                        <NavLink to="/"> <FaHome />Home</NavLink>
                    </li>
                    <li>

                        <NavLink to="/order/salad"> <FaSearchMinus />Menu</NavLink>
                    </li>
                    <li>

                        <NavLink to="/order/contact"> <FaEnvelope />Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-9">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;