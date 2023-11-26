import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactStars from 'react-rating-stars-component'
import { faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import "./reviewsCard.css"

function ReviewsCard() {
    const {  ProductReviews } = useSelector(state => state.product)
    console.log(ProductReviews,"ProductReviews")

    return (
        <div className='reviCard'>
            <div className='revContainer'>
                {
                    ProductReviews?.data?.length > 1
                        ? ProductReviews?.data?.map((item, inde) => <div className='userReviews' key={inde}>
                            <FontAwesomeIcon icon={faUserCircle} />
                            <span>{item.name}</span>
                            <ReactStars
                                edit={false}
                                count={5}
                                size={24}
                                value={item.rating}
                                activeColor="#ffd700"
                            />
                            <span>{item.comment}</span>
                        </div>)
                        : <p>No Reviews Yet !</p>
                }

            </div>
        </div>
    )
}

export default ReviewsCard