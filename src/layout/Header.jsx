import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faUserCircle, } from '@fortawesome/free-solid-svg-icons'
import '../layout/header.css'
import { getUser, removeUser } from '../utils/userData'
import { getlogOutuserApi } from "../reducers/productReducer"
import { useDispatch, useSelector } from 'react-redux'
import toastMessage from '../utils/toastMessage'
import Loader from './Loader'
const token = getUser()

function Header() {

    const [show, setshow] = useState(false)
    const header = [{ label: "Home", value: "/" }, { label: "Product", value: "/product" }, { label: "AboutUs", value: "/about-us" }]
    const dispatch = useDispatch()
    const { logOutuser, isLoading ,loginUserData} = useSelector((state) => state.product)

    useEffect(() => {

    }, [loginUserData?.data,logOutuser?.data])
    console.log(logOutuser)
    console.log(token)
    console.log(loginUserData,"loginUserData")

    const handleLogOutUser = () => {
        dispatch(getlogOutuserApi()).then((res) => {
            // console.log(res, 'resLogOut')
            if (res.type === "product/getlogOutuserApi/fulfilled") {
                toastMessage("User Log-Out Successful", "success")
                removeUser()
            }
        })
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
                        <div onClick={() => { handleLogOutUser() }}><FontAwesomeIcon icon={faUser} />Log-Out</div>
                    </div>
                    : <div className='headerProfile'><Link style={{ textDecoration: "none", color: "none" }} to={"/login"}><FontAwesomeIcon icon={faUserCircle} /></Link></div>}
            </div>
        </div >
    </>
    )
}

export default Header