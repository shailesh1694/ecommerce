import axios from "axios";
import { getUser, removeUser } from "./userData";

import toastMessage from "./toastMessage";
import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const token = getUser()
// export async function callGetApi(url) {
//     let res = await fetch(url, {
//         headers: {
//             "Content-Type": "application/json",
//             'authorization': `Bearer ${token} `
//         }
//     });
//     return res.json();
// }

// export async function callPostApi(url, data) {
//     let res = await fetch(url, {
//         method: "POST",
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json",
//             'authorization': `Bearer ${token} `
//         }
//     });
//     return res.json();
// }

export async function callApi(method = "get", url, data = {}, thunkApi) {
    let headers = {}
    headers["authorization"] = `Bearer ${getUser()}`
    const response = await axios({
        method: method,
        url: url,
        data: data,
        headers
    }).then(res => res).catch(error => {
        toastMessage(error.response.data.msg)
        console.log(error, "error");
        if (error.response.data.msg === "jwt expired") {
            removeUser()
            window.location.href = "/login"
        }
        if (error.response.data.msg === "invalid token") {
            window.location.href = "/login"
            removeUser()
        }
        if (error.response.data.msg === "jwt malformed") {
            window.location.href = "/login"
            removeUser()
        }

    })

    return response.data

}




