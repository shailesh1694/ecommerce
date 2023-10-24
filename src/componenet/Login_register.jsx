import React, { useState } from 'react'
import "./login_register.css";
import { loginUserapi } from "../reducers/productReducer"
import toastMessage from "../utils/toastMessage"
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../utils/userData"
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';

function Login_register() {

    const [login, setLogin] = useState(false)
    const initialState = {
        name: "",
        email: "",
        password: ""
    }
    const [logiData, setLogiData] = useState({ ...initialState })
    const { loginUserData, isLoading } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleSetLogin = () => {
        setLogin((pre) => !pre)
        setLogiData({ ...initialState })
    }
    const hanldeInputChange = (e) => {
        setLogiData((pre) => { return { ...pre, [e.target.name]: e.target.value } })
    }

    const callLoginApi = () => {
        if (!logiData.email || !logiData.password) {
            return toastMessage("Enter Email or Password !")
        } else {
            dispatch(loginUserapi({
                email: logiData.email,
                password: logiData.password
            })).then((res) => {
                if (res.type === "product/loginUserapi/fulfilled") {
                    toastMessage("user Login Success", "success")
                    setUser(res.payload.token)
                    navigate("/product")
                }
            })
        }
    }

    return (
        <>{isLoading && <Loader />}
            <div className='loginCompo'>
                <div className='loginContainer'>
                    <div className="loginForm">
                        <div className="radionContainer">
                            <div className="loginradion">
                                <input name="select" id='login' checked={!login} type="radio" onChange={() => { handleSetLogin() }} />
                                <label htmlFor="login">Login</label>
                            </div>
                            <div className="loginradion">
                                <input name="select" id='register' checked={login} onChange={() => { handleSetLogin() }} type="radio" />
                                <label htmlFor="register">Register</label>
                            </div>
                        </div>
                        {login && <input name='name' onChange={(e) => { hanldeInputChange(e) }} type='text' placeholder='Enter Your Name' />}
                        <input name='email' onChange={(e) => { hanldeInputChange(e) }} type='email' placeholder='Email' />
                        <input name='password' onChange={(e) => { hanldeInputChange(e) }} type='password' placeholder='Password' />
                        {!login && <span className='forgotPassword'>Forgot Email Or Password!</span>}
                        {login ? <button>Register</button> : <button onClick={(e) => { callLoginApi() }}>Login</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login_register