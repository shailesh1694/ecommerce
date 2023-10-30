import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChangePassword, forgotPasswordReset } from "../reducers/productReducer"
import Loader from '../layout/Loader'
import "./viewProfile.css"
import toastMessage from '../utils/toastMessage'
import { useNavigate, useSearchParams } from 'react-router-dom'
function ViewProfile() {

    const initialState = {
        old_pass: "",
        new_pass: "",
        confrim_new_pass: ""
    }

    const [passChange, setPassChange] = useState({ ...initialState })
    const { isLoading } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams()

    const changePassword = (e) => {
        setPassChange((pre) => { return { ...pre, [e.target.name]: e.target.value } })
    }
    const handeSubmi = () => {
        if (!searchParams.get("usertoken")) {
            if (passChange.new_pass === "" || passChange.old_pass === "" || passChange.confrim_new_pass === "") {
                return toastMessage("Enter All details !")
            }
            dispatch(getChangePassword({
                old_password: passChange.old_pass,
                new_password: passChange.new_pass,
                c_newpassword: passChange.confrim_new_pass
            })).then((res) => {
                if (res.type === 'product/getChangePassword/fulfilled') {
                    toastMessage(res.payload.msg, "success")
                    setPassChange({ ...initialState })
                }
            })
        } else {
            if (passChange.new_pass !== passChange.confrim_new_pass) {
                return toastMessage("Please Enter same Password !")
            }
            dispatch(forgotPasswordReset({
                token: searchParams.get("usertoken"),
                new_password: passChange.new_pass,
                c_newpassword: passChange.confrim_new_pass
            })).then((res) => {
                if (res.type === 'product/forgotPasswordReset/fulfilled') {
                    toastMessage(res.payload.msg, "success")
                    navigate("/login")
                }
            })
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className='profile_compo'>
                <div className="profile_container">
                    <div className='changePassword'>
                        {!searchParams.get("usertoken") && <input type='password' name='old_pass' value={passChange.old_pass} placeholder='Old_Password' onChange={changePassword} />}
                        <input type='password' name='new_pass' value={passChange.new_pass} placeholder='New_Password' onChange={changePassword} />
                        <input type='password' name='confrim_new_pass' value={passChange.confrim_new_pass} placeholder='Confirm_New_Password' onChange={changePassword} />
                        <button onClick={handeSubmi}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProfile