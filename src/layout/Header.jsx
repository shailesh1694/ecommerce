import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faUserCircle, faArrowLeftLong, faUserLock ,faDashboard,faSignOut,faSignIn,faSigning} from '@fortawesome/free-solid-svg-icons'
import '../layout/header.css'
import { getUser, removeUser } from '../utils/userData'
import { getlogOutuserApi, getLoginuserDetails } from "../reducers/productReducer"
import { useDispatch, useSelector } from 'react-redux'
import toastMessage from '../utils/toastMessage'
import Loader from './Loader'

function Header() {

    const header = [{ label: "Home", value: "/" }, { label: "Product", value: "/product" }, { label: "AboutUs", value: "/about-us" }]
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
    return (<>
        {isLoading && <Loader />}
        <div className='headerCotainer'>
            <div className="headerList">
                <p>E-COMMERSE</p>
                <ul className='listContainer'>
                    {header.map((item, index) => <li><Link style={{ textDecoration: "none" }} to={item.value} key={index}> {item.label}</Link></li>)}
                </ul>
                {token
                    ? <div className='headerProfile'>
                        <div><FontAwesomeIcon icon={faShoppingCart} /></div>
                        <div style={{ position: "relative"}}>
                            <div onClick={() => { handleCallProfileapi() } } style={{cursor:"pointer"}}><FontAwesomeIcon icon={faUserCircle} /></div>
                            {show && <div className='profileShow'>
                                <div className='profileShowName'><FontAwesomeIcon icon={faUser} /><span>{getUserDetails?.user?.name}</span></div>
                                {getUserDetails?.user?.role === "admin" && <div className='profileShowName'><FontAwesomeIcon icon={faDashboard} /><span>Dashbord</span></div>}
                                <div className='profileShowName' onClick={()=>handleLogOutUser()}><FontAwesomeIcon icon={faSignOut} /><span>Log-out</span></div>
                            </div>}
                        </div>
                    </div>
                    : <div className='headerProfile'><Link style={{ textDecoration: "none", color: "none" }} to={"/login"}><FontAwesomeIcon icon={faSignIn} /></Link></div>}
            </div>
        </div>
    </>
    )
}

export default Header