import urlRoutes from '../../pages/protected/sidebar/UrlRoutes.js';
import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu.js';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import rms from "../../assets/images/rms.jpg"
import { useDispatch } from 'react-redux';
import { toggleLeftDrawer } from '../common/headerSlice.js';

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click();
    }

    const toggleSideBarForLg = () => {
        dispatch(toggleLeftDrawer());
    }

    return (
        <div className="drawer-side z-20 shadow-md ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-80 bg-base-100 min-h-full text-base-content">

                {/* Button for small devices, hidden on large devices */}
                <button className="p-2 m-1 btn btn-ghost ml-4  btn-circle z-50 top-0 right-0 mt-3 mr-2 absolute lg:hidden" onClick={() => close()}>
                   <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Button for large devices, hidden on small and medium devices */}
                <button className="p-2 m-1 btn btn-ghost ml-4  btn-circle z-50 top-0 right-0 mt-3 mr-2 absolute hidden lg:block" onClick={() => toggleSideBarForLg()}>
                    <XMarkIcon className="h-6 w-6 inline-block" />
                </button>

                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/welcome'}><img className="mask mask-squircle w-10" src={rms} alt="RMS Logo" />RMS</Link>
                </li>


                {
                    urlRoutes.map((route, k) => {
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route} /> :
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-100 ' : 'font-normal '} text-base `} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-gray-800	dark:bg-white "
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar



// import { useState } from 'react'; // Import useState
// import urlRoutes from '../../pages/protected/sidebar/UrlRoutes.js';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import SidebarSubmenu from './SidebarSubmenu.js';
// import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
// import rms from "../../assets/images/rms.jpg";

// function LeftSidebar() {
//     const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State for sidebar visibility
//     const location = useLocation();

//     const close = () => {
//         document.getElementById('left-sidebar-drawer').click()
//         setIsSidebarVisible(false); // Hide the sidebar
//     };

//     return (
//         <>
//             {/* Only render the sidebar if isSidebarVisible is true */}
//             {isSidebarVisible && (
//                 <div className="drawer-side z-20 shadow-md">
//                     <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
//                     <ul className="menu pt-2 w-80 bg-base-200 min-h-full text-base-content">
//                         {/* Close button visible only on large screens */}
//                         <button
//                             className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 hidden lg:block"
//                             onClick={close} // Call close function
//                         >
//                             <XMarkIcon className="h-5 inline-block w-5" />
//                         </button>

//                         <li className="mb-2 font-semibold text-xl">
//                             <Link to={'/app/welcome'}>
//                                 <img className="mask mask-squircle w-10" src={rms} alt="RMS Logo" />
//                                 RMS
//                             </Link>
//                         </li>

//                         {urlRoutes.map((route, k) => (
//                             <li key={k}>
//                                 {route.submenu ? (
//                                     <SidebarSubmenu {...route} />
//                                 ) : (
//                                     <NavLink
//                                         end
//                                         to={route.path}
//                                         className={({ isActive }) =>
//                                             `${isActive ? 'font-semibold bg-base-200' : 'font-normal'} text-base`
//                                         }
//                                     >
//                                         {route.icon} {route.name}
//                                         {location.pathname === route.path ? (
//                                             <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-gray-800 dark:bg-white" aria-hidden="true"></span>
//                                         ) : null}
//                                     </NavLink>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }

// export default LeftSidebar;
