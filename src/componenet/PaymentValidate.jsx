import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVerifyOrderConfirmation, getorderByOrderId } from "../reducers/productReducer"
import { useSearchParams } from 'react-router-dom';
import Loader from '../layout/Loader';

function PaymentValidate() {

  let [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch();

  const { isLoading, OrderVerification } = useSelector(state => state.product)
  useEffect(() => {
    dispatch(getVerifyOrderConfirmation({
      order_id: searchParams.get("order_reference"),
      payment_id: searchParams.get("referance")
    })).then((res) => {
      if (res.type === "product/getVerifyOrderConfirmation/fulfilled") {
        dispatch(getorderByOrderId(searchParams.get("order_reference")))      }
    })
  }, [])
console.log(OrderVerification,"OrderVerification")

  return (
    <>
      {isLoading && <Loader />}
      <div>PaymentValidateSuccessFul</div>
    </>
  )
}

export default PaymentValidate