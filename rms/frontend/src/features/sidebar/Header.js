import { themeChange } from 'theme-change'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
// import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { openRightDrawer } from '../common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil'
import userCircle from '../../assets/images/userCircle.png'

import { Link } from 'react-router-dom'
import { toggleLeftDrawer } from '../common/headerSlice'


function Header() {

    const dispatch = useDispatch();
    const { noOfNotifications, pageTitle } = useSelector(state => state.header);
    const { showLeftDrawer } = useSelector((state) => state.header);
    const { name, isAuthenticated } = useSelector(state => state.auth);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));

    useEffect(() => {
        themeChange(false);  // Initialize theme-change for theme switching
        const savedTheme = localStorage.getItem('theme') || 'light';
        setCurrentTheme(savedTheme);
    }, [currentTheme]);

    const toggleSideBarForLg = () => {
        dispatch(toggleLeftDrawer());
    }
    // console.log(name + " " + isAuthenticated);

    // Opening right sidebar for notification
    // const openNotification = () => {
    //     dispatch(openRightDrawer({header : "Notifications", bodyType : RIGHT_DRAWER_TYPES.NOTIFICATION}))
    // } 


    function logoutUser() {
        localStorage.clear();
        window.location.href = '/auth/login'
    }

    return (
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

        <>
            <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md">


                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">

                    <label htmlFor="left-sidebar-drawer" className="p-3 m-0 btn btn-square btn-ghost drawer-button lg:hidden">
                        <Bars3Icon className="h-6 inline-block w-6" />
                    </label>

                    {!showLeftDrawer ?
                        <label className="p-3 m-0 btn btn-square btn-ghost hidden lg:block" onClick={toggleSideBarForLg}>
                            <Bars3Icon className="h-6 inline-block w-6" />
                        </label> : ""
                    }


                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>



                <div className="flex-none ">

                    {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

                    {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}


                    {/* Light and dark theme selection toogle **/}
                    <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label>


                    {/* Notification icon */}
                    {/* <button className="btn btn-ghost ml-4  btn-circle" onClick={() => openNotification()}>
                    <div className="indicator">
                        <BellIcon className="h-6 w-6"/>
                        {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null }
                    </div>
                </button> */}


                    {
                        isAuthenticated ?
                            <div className="dropdown dropdown-end ml-4">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={userCircle} alt="profile" />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="justify-between">
                                        <Link to={'/app/settings-profile'}>
                                            Profile Settings
                                            {/* <span className="badge">New</span> */}
                                        </Link>
                                    </li>
                                    {/* <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li> */}
                                    <div className="divider mt-0 mb-0"></div>
                                    <li><Link onClick={logoutUser}>Logout</Link></li>
                                </ul>
                            </div>
                            : ""
                    }
                </div>
            </div>

        </>
    )
}

export default Header;