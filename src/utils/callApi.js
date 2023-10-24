import axios from "axios";
import { getUser } from "./userData";
import toastMessage from "./toastMessage";
import { isRejected, isRejectedWithValue } from "@reduxjs/toolkit";


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
    headers["authorization"] = `Bearer ${token}`
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data,
            headers
        })
        return response.data
    } catch (error) {
        return error
    }
}




