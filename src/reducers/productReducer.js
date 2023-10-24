import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { callApi } from "../utils/callApi";
import { getUser } from "../utils/userData";
import axios from "axios";

let headers = {}
headers["authorization"] = `Bearer ${getUser()}`

export const getAllproductApi = createAsyncThunk('product/getAllproductApi', async (payload, thunkApi) => {
    let params = ``
    if (payload.price && !payload.category) {
        params = `?${payload.price}`
    } else if (payload.category && !payload.price) {
        params = `?category=${payload.category}`
    } else if (payload.category && payload.price) {
        params = `?category=${payload.category}&${payload.price}`
    } else {
        params = null
    }
    if (params) {
        try {
            const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allproduct" + params })
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue("error")
        }

    } else {
        try {
            const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allproduct" })
            return response.data
        } catch (error) {
            return thunkApi.rejectWithValue("error")
        }

    }


    // const data = await callApi("get", "http://localhost:8080/api/v1/allproduct" + payload)
})

export const getSingleProductApi = createAsyncThunk('product/getSingleProductApi', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allproduct" })
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue("error")
    }
})
export const loginUserapi = createAsyncThunk('product/loginUserapi', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/login", data: payload })
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue("Error")
    }
})
export const getlogOutuserApi = createAsyncThunk('product/getlogOutuserApi', async (payload, thunkApi) => {

    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/logOut", headers: headers })
        return response.data
    } catch (error) {
        return thunkApi.rejectWithValue("Error")
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoading: false,
        isError: false,
        isSuccess: false,
        AllProduct: [],
        SingleProduct: [],
        loginUserData: {},
        logOutUser: {}
    },
    reducers: {
        reset(state, action) {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllproductApi.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getAllproductApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.AllProduct = action.payload
            })
            .addCase(getAllproductApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.AllProduct = action.payload
            })

            .addCase(getSingleProductApi.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getSingleProductApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.SingleProduct = action.payload
            })
            .addCase(getSingleProductApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.SingleProduct = action.payload
            })

            .addCase(loginUserapi.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(loginUserapi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.loginUserData = action.payload
            })
            .addCase(loginUserapi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.loginUserData = action.payload
            })

            .addCase(getlogOutuserApi.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getlogOutuserApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.logOutUser = action.payload
            })
            .addCase(getlogOutuserApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.logOutUser = action.payload
            })
    },
})

export const { reset } = productSlice.actions
export default productSlice.reducer