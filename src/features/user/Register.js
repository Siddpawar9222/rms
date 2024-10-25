import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import registerApi from '../../services/api/user/RegisterApi'
import Header from '../sidebar/Header'
import { showNotification } from '../common/headerSlice'
import { useDispatch } from 'react-redux'

function Register() {

    const dispatch = useDispatch();

    const INITIAL_REGISTER_OBJ = {
        name: "",
        emailId: "",
        password: ""
    }
     
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)


    const submitFormDataToServer = async (registerObjParam) => {
        return await registerApi(registerObjParam);
    }

    const submitForm = async(e) => {
        e.preventDefault()
        setErrorMessage("")

        if (registerObj.name.trim() === "") {
            return setErrorMessage("Name is required!")
        }
        if (registerObj.emailId.trim() === "") {
            return setErrorMessage("EmailId is required!")
        }
        if (registerObj.password.trim() === "") {
            return setErrorMessage("Password is required!")
        }
        else {
            setLoading(true);
            const response = await submitFormDataToServer(registerObj);
            if (response?.status == 201) {
                console.log(response?.data?.message);
                dispatch(showNotification({ message: `${response?.data?.message}`, status: 1 })) 
                setTimeout(() => {
                    window.location.href = '/auth/login'
                 }, 2000);
            } else {
                setErrorMessage(response?.statusText);
            }

            setLoading(false)
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setRegisterObj({ ...registerObj, [updateType]: value })
    }

    return (
        <>
        <Header/>
        <div className="min-h-screen bg-base-100 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        {/* Importing LandingIntro component to left side of page */}
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                                <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className="btn mt-2 w-full bg-neutral text-white hover:bg-neutral-700 dark:bg-neutral-300 dark:text-black dark:hover:bg-neutral-400">
                                {loading ? <span className="loading loading-spinner"></span> : "Register"}
                            </button>

                            <div className='text-center mt-4'>Already have an account? <Link to="/auth/login"><span className="inline-block hover:cursor-pointer hover:text-primary hover:no-underline underline transition duration-200">Login</span></Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register