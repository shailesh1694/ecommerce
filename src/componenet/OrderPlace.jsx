import React, { useEffect } from 'react'
import { getUser } from '../utils/userData';

function OrderPlace() {


    const payNow = (e) => {
        e.preventDefault();
        var options = {
            "key": "rzp_test_woRxW1TAX8YPUu", // Enter the Key ID generated from the Dashboard
            "amount": 200, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "MoriCompnay",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": "order_NY3zRU9nj19Oav", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `http://localhost:8080/api/v1/payment-validate/${getUser()}`,
            "prefill": {
                "name": "Shailesh Mori",
                "email": "morishailesh982@gmail.com",
                "contact": "8401753537"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        console.log(options, "option")
        var rzp1 = new window.Razorpay({ ...options });
        console.log(rzp1, "rz")
        rzp1.open();
    }

    return (
        <div>
            <button onClick={payNow}>Pay</button>
        </div>
    )
}

export default OrderPlace