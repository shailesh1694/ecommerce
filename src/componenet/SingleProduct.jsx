import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { getSingleProductApi } from '../reducers/productReducer'
import "./singleProduct.css"
import ReviewsCard from './ReviewsCard'

function SingleProduct() {

    const location = useParams()
    const dispatch = useDispatch()
    const { SingleProduct } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getSingleProductApi(location.id))
    }, [])


    // console.log(SingleProduct.product, "SingleProduct")
    return (
        <>
            <div className='singleProduct'>
                <div className='singleProductContainer'>
                    <img src={SingleProduct.product?.images[0].url} />
                    <div className='ProductDetails'>
                        <h4>{SingleProduct.product?.title}</h4>
                        <span>{SingleProduct.product?._id}</span>
                        <div className="productDetails_block1">
                            <ReactStars
                                edit={false}
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                                value={SingleProduct.product?.totalrating}
                            />
                            <span>({SingleProduct.product?.numOfReviews} Reviews)</span>
                        </div>
                        <h2>&#8377;{SingleProduct.product?.price}</h2>
                        <div className='productDetails_block2'>
                            <div className='quntity'>
                                <button className='ptivebutton'>&#8722;</button>
                                <input type="number" name="" id="" />
                                <button className='ptivebutton'>&#43;</button>
                            </div>
                            <button>ADD To Card</button>
                        </div>
                        <div className="productDetails_block3">
                            <span>Status:</span>{SingleProduct.product?.stock > 0 ? <span className='inStock'>In Stock</span> : <span className='outofstock'>Out of Stock</span>}
                        </div>
                        <div className='productDetails_block4'>
                            <h2>Description</h2>
                            <span>{SingleProduct.product?.description}</span>
                        </div>
                        <div className='productDetails_block5'>
                            <button>Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='productReview'>Product Reviews</h3>
            <ReviewsCard />
        </>
    )
}

export default SingleProduct