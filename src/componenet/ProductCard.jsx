import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { getAllproductApi } from "../reducers/productReducer"
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../layout/Loader"
import "./productCard.css"
import logo from "../logo.svg"
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import Header from '../layout/Header';
function ProductCard() {

    const { AllProduct, isLoading } = useSelector(state => state.product)
    const dispatch = useDispatch()

    const [page, setpage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const price = [
        { value: `price[lte]=${10000}`, label: "Below 10000" },
        { value: `price[gte]=${10000}&price[lte]=${30000}`, label: "Between 10000 and 30000" },
        { value: `price[gte]=${30000}`, label: "Above 30000" }
    ]
    const [priceFilter, setPriceFilter] = useState({
        price: null,
        category: null,
        c_index: null,
        p_index: null
    })


    const priceData = [...new Set(AllProduct?.product?.map((item) => item.price))];

    useEffect(() => {
        callProductApi()
    }, [priceFilter])
    console.log(priceData[priceData.length - 1], "data")
    console.log(priceData[0], "data")
    
    // const fetchMoredata = (e) => {
    //     if (productData?.length !== (AllProduct?.productCoutne || AllProduct?.filterPriceCount)) {
    //         setpage((pre) => pre + 1)
    //     } else {
    //         setHasMore(() => false)
    //     }
    // }

    const callProductApi = (price) => {
        dispatch(getAllproductApi({ price: priceFilter.price, category: priceFilter.category }))
    }
    const priceChangeFilter = (e, index, from) => {
        if (from === "c") {
            setPriceFilter((pre) => { return { ...pre, [e.target.name]: e.target.value, c_index: index } })
        } else {
            setPriceFilter((pre) => { return { ...pre, [e.target.name]: e.target.value, p_index: index } })
        }
    }

    const category = ["smartphones", "laptop", "refrigrator"]

    console.log(AllProduct, "AllProduct")
    return (
        <>
            {isLoading && <Loader />}
            <div className='product'>
                <div className='productContainer'>
                    <div className='filterTab'>
                        <div className='priceRange'>
                            {/* <span>Price Range</span>
                            {price.map((item, index) => <label key={index} ><input type='checkbox' checked={priceFilter.p_index === index} name="price" onChange={(e) => priceChangeFilter(e, index, "p")} value={item.value} />{item.label}</label>)} */}
                            <label htmlFor="customRange2" className="form-label">Product Price</label>
                            <input type="range" className="form-range" min= {priceData[0]} max={priceData[priceData.length - 1]} id="customRange2" onChange={(e) => {
                                const { min, max, value } = e.target;
                                console.log(min, max, value)
                            }}></input>
                        </div>
                        <div className='priceRange'>
                            <span>Category</span>
                            {category.map((item, index) => <label key={index}><input type='checkbox' name="category" checked={priceFilter.c_index === index} onChange={(e) => priceChangeFilter(e, index, "c")} value={item} />{item}</label>)}
                        </div>
                        <button className='clearbtn' onClick={(e) => setPriceFilter((pre) => { return { ...pre, price: null, category: null, c_index: null, p_index: null } })}>Clear-Filters</button>
                    </div>
                    <div className='productlist'>
                        {
                            AllProduct?.product?.length > 0
                                ? AllProduct?.product?.map((item, inde) => {
                                    return <div key={inde}>
                                        <div className='productCard'>
                                            <Link to={`/product/${item._id}`}>
                                                <p>{item.title}</p>
                                                <div>
                                                    <ReactStars
                                                        edit={false}
                                                        count={5}
                                                        // onChange={ratingChanged}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        value={item.totalrating}
                                                    />
                                                    <span>{item.numOfReviews}</span>
                                                </div>
                                                <span>${item.price}</span></Link>
                                        </div>
                                    </div>
                                })
                                : <p>No Product Found</p>
                        }
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductCard