import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { getAllproductApi } from "../reducers/productReducer"
import './home.css'

function Home() {

    const dispatch = useDispatch()
    const { AllProduct } = useSelector(state => state.product)

    useEffect(() => {
        
    }, [])


    return (<>
        <h1 className='headerFuture'>FutureProduct</h1>
        <div className='home'>
            <div className="homeContainer">
                <ProductCard />
            </div>
        </div>
    </>
    )
}

export default Home