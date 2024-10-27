// import { useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import LandingIntro from './LandingIntro'
// import ErrorText from '../../components/Typography/ErrorText'
// import InputText from '../../components/Input/InputText'
// import loginApi from '../../services/api/user/LoginApi'
// import Header from '../sidebar/Header'
// import { useDispatch} from 'react-redux'
// import { showNotification } from '../common/headerSlice'
// import { loginSuccess } from '../common/authSlice'
// import { EyeSlashIcon } from '@heroicons/react/16/solid'


// function Login() { 

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const INITIAL_LOGIN_OBJ = {
//         emailId: "",
//         password: ""
//     }

//     const [loading, setLoading] = useState(false)
//     const [errorMessage, setErrorMessage] = useState("")
//     const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

//     const submitFormDataToServer = async (loginObjParam) => {
//         return await loginApi(loginObjParam);

//     }

//     const submitForm = async (e) => {
//         e.preventDefault()
//         setErrorMessage("")

//         // Check whether all fields are filled or not
//         if (loginObj.emailId.trim() === "") {
//             return setErrorMessage("Email Id is required!")
//         }
//         if (loginObj.password.trim() === "") {
//             return setErrorMessage("Password is required!")
//         }
//         else {
//             setLoading(true);
//             const response = await submitFormDataToServer(loginObj);
//             console.log(response);
//             //Call API to check user credentials and save jwtToken in localstorage
//             if (response?.status == 200) {

//                 const userInfo = response?.data?.data;

//                 localStorage.setItem("jwtToken", userInfo?.jwtToken);

//                 //for notication(toast)
//                 dispatch(showNotification({ message: `${response?.data?.message}`, status: 1 }))

//                 //For Role based navigation
//                 dispatch(loginSuccess({ name : userInfo?.name, role : userInfo?.roles, isAuthenticated : true }));

//                 setTimeout(() => {
//                     navigate('/app/dashboard');
//                 }, 2000);

//             } else {
//                 setErrorMessage(response?.statusText);
//             }

//             setLoading(false);
//         }

//     }

//     const updateFormValue = ({ updateType, value }) => {
//         setErrorMessage("")
//         setLoginObj({ ...loginObj, [updateType]: value })
//     }


//     return (
//         <>   
//             <Header />
//             <div className="min-h-screen bg-base-200 flex items-center">
//                 <div className="card mx-auto w-full max-w-5xl  shadow-xl">
//                     <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-200 rounded-xl">
//                         <div className=''>
//                             {/* Importing LandingIntro component to left side of page */}
//                             <LandingIntro />
//                         </div>
//                         <div className='py-24 px-10'>
//                             <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
//                             <form onSubmit={(e) => submitForm(e)}>
//                                 <div className="mb-4">

//                                     <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

//                                     <InputText defaultValue={loginObj.password} 
//                                     type="password" updateType="password"
//                                     containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />
//                                 </div>

//                                 <div className='text-right'><Link to="/auth/forgot-password"><span className="text-sm inline-block underline hover:cursor-pointer hover:no-underline hover:text-primary transition duration-200">Forgot Password?</span></Link>
//                                 </div>

//                                 <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

//                                 {/* <button type="submit" className="btn mt-2 w-full btn-primary">
//                                 {loading ? <span className="loading loading-spinner"></span> : "Login"}
//                             </button> */}

//                                 <button type="submit" className="btn mt-2 w-full bg-neutral text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400 ">
//                                     {loading ? <span className="loading loading-spinner"></span> : "Login"}
//                                 </button>

//                                 <div className='text-center mt-4'>Don't have an account yet? <Link to="/auth/register"><span className="inline-block hover:text-primary underline hover:no-underline  hover:cursor-pointer transition duration-200">Register</span></Link></div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login;


// Code to show and hide password while typing


import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleLogin, handleLogout } from '../../utils/authUtil';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import loginApi from '../../services/api/user/LoginApi';
import Header from '../sidebar/Header';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../common/headerSlice';
import { loginSuccess } from '../common/authSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
const BASEURL = process.env.REACT_APP_SPRING_URL;


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const INITIAL_LOGIN_OBJ = {
        emailId: "",
        password: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const submitFormDataToServer = async (loginObjParam) => {
        return await loginApi(loginObjParam);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Validation
        if (loginObj.emailId.trim() === "") {
            return setErrorMessage("Email Id is required!");
        }
        if (loginObj.password.trim() === "") {
            return setErrorMessage("Password is required!");
        }

        setLoading(true);
        const response = await submitFormDataToServer(loginObj);

        if (response?.status === 200) {
            const userInfo = response?.data?.data;

            handleLogin({ name: userInfo?.name, role: userInfo?.roles, isAuthenticated: true, jwtToken: userInfo?.jwtToken });

            dispatch(showNotification({ message: `${response?.data?.message}`, status: 1 }));

            setTimeout(() => {
                navigate('/app/dashboard');
            }, 2000);

        } else {
            setErrorMessage(response?.statusText);
        }

        setLoading(false);
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/app/dashboard');
        }
    }, [])

    return (
        <>
            <Header />
            <div className="min-h-screen bg-base-100 flex items-center">
                <div className="card mx-auto w-full max-w-5xl shadow-xl">
                    <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                        <div>
                            <LandingIntro />
                        </div>
                        <div className="py-24 px-10">
                            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>

                            <button
                                className="btn btn-outline w-full my-4"
                                onClick={() => window.location.href = `${BASEURL}/oauth2/authorization/google`}
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="h-[18px] w-[18px]"
                                />
                                Continue with Google
                            </button>


                            <div className="flex w-full items-center gap-2 py-4 text-sm text-slate-600">
                                <div className="h-px w-full bg-slate-200"></div>
                                OR
                                <div className="h-px w-full bg-slate-200"></div>
                            </div>



                            <form onSubmit={(e) => submitForm(e)}>
                                <div className="mb-4">
                                    {/* Email Field */}
                                    <InputText
                                        type="emailId"
                                        defaultValue={loginObj.emailId}
                                        updateType="emailId"
                                        containerStyle="mt-4"
                                        labelTitle="Email Id"
                                        updateFormValue={updateFormValue}
                                    />

                                    {/* Password Field with toggle visibility */}
                                    <div className="relative mt-4">
                                        <InputText
                                            type={passwordVisible ? "text" : "password"}
                                            defaultValue={loginObj.password}
                                            updateType="password"
                                            containerStyle="mt-4"
                                            labelTitle="Password"
                                            updateFormValue={updateFormValue}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            // className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"

                                            className="absolute top-[38px] bottom-0 right-2 text-gray-500 dark:text-gray-300"


                                        >
                                            {passwordVisible ? (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Link to="/auth/forgot-password">
                                        <span className="text-sm inline-block underline hover:cursor-pointer hover:no-underline hover:text-primary transition duration-200">
                                            Forgot Password?
                                        </span>
                                    </Link>
                                </div>

                                <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>

                                <button type="submit" className="btn mt-2 w-full bg-neutral text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400">
                                    {loading ? <span className="loading loading-spinner"></span> : "Login"}
                                </button>

                                <div className="text-center mt-4">
                                    Don't have an account yet?{" "}
                                    <Link to="/auth/register">
                                        <span className="inline-block hover:text-primary underline hover:no-underline hover:cursor-pointer transition duration-200">
                                            Register
                                        </span>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
