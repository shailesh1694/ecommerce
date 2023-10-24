import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactStars from 'react-rating-stars-component'
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import "./reviewsCard.css"

function ReviewsCard() {
    const { SingleProduct } = useSelector(state => state.product)

    // console.log(SingleProduct?.product?.reviews.length, "SingleProduct")
    return (
        <div className='reviCard'>
            <div className='revContainer'>
                {
                    SingleProduct?.product?.reviews.length > 1
                        ? SingleProduct?.product?.reviews.map((item, inde) => <div className='userReviews' key={inde}>
                            <FontAwesomeIcon icon={faUserCircle} />
                            <span>Shailesh</span>
                            <ReactStars
                                edit={false}
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                            />
                            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam itaque quod, sed aspernatur doloribus, vero repudiandae, aut quas </span>
                        </div>)
                        : <p>No Reviews Yet !</p>
                }

            </div>
        </div>
    )
}

export default ReviewsCard