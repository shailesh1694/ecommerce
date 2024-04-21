import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useNavigation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faUserCircle, faUserLock, faDashboard, faSignOut, faSignIn, faSigning, faHome, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import '../layout/header.css'
import { getUser, removeUser } from '../utils/userData'
import { getlogOutuserApi, getLoginuserDetails } from "../reducers/productReducer"
import { useDispatch, useSelector } from 'react-redux'
import toastMessage from '../utils/toastMessage'
import Loader from './Loader'

function Header() {

    const header = [{ label: "Home", value: "/", icon: faHome },
    { label: "Card", value: "/card", icon: faShoppingCart },
    { label: "Profile", value: "/profile", icon: faUser },
    { label: "Order", value: "/order", icon: faAddressCard },
    { label: "DashBoard", value: "/dashboard", icon: faDashboard },
    { label: "Login", value: "/login", icon: faSignIn },
    ]
    
    const token = getUser()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, getUserDetails } = useSelector((state) => state.product)
    const [show, setShow] = useState(false)


    const handleLogOutUser = () => {
        dispatch(getlogOutuserApi()).then((res) => {
            // console.log(res, 'resLogOut')
            if (res.type === "product/getlogOutuserApi/fulfilled") {
                toastMessage("User Log-Out Successful", "success")
                removeUser()
                navigate("/")
            }
        })
    }

    const handleCallProfileapi = () => {
        if (!getUserDetails?.success) { dispatch(getLoginuserDetails()) }
        setShow(() => !show)
    }

    const handleChangePassword = () => {
        setShow(() => !show)
        navigate("/change_password")
    }

    return (<>
        {isLoading && <Loader />}
        {/* {token
                ? <div className='headerProfile'>
                    <div><FontAwesomeIcon icon={faShoppingCart} /></div>
                    <div style={{ position: "relative" }}>
                        <div onClick={() => { handleCallProfileapi() }} style={{ cursor: "pointer" }}><FontAwesomeIcon icon={faUserCircle} /></div>
                        {show && <div className='profileShow'>
                            <div className='profileShowName'><FontAwesomeIcon icon={faUser} /><span>{getUserDetails?.user?.name}</span></div>
                            <div className='profileShowName' onClick={handleChangePassword}><FontAwesomeIcon icon={faUserLock} /><span>Change-Password</span></div>
                            {getUserDetails?.user?.role === "admin" && <div className='profileShowName'><FontAwesomeIcon icon={faDashboard} /><span>Dashbord</span></div>}
                            <div className='profileShowName' onClick={() => handleLogOutUser()}><FontAwesomeIcon icon={faSignOut} /><span>Log-out</span></div>
                        </div>}
                    </div>
                </div>
                : <div className='headerProfile'><Link style={{ textDecoration: "none", color: "none" }} to={"/login"}><FontAwesomeIcon icon={faSignIn} /></Link></div>} */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {header.map((item, index) => <li className='nav-item' key={index}>
                            <Link className='nav-link' to={item.value}>
                                <div className='profileShowName'>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.label}</span>
                                </div>

                            </Link>
                        </li>)}
                    </ul>
                </div>
            </div>
        </nav>
    </>
    )
}

export default Header