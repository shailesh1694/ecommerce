import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callApi } from "../utils/callApi";
import axios from "axios";


export const getAllproductApi = createAsyncThunk('product/getAllproductApi', async (payload, thunkApi) => {

    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allproduct", withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getSingleProductApi = createAsyncThunk('product/getSingleProductApi', async (payload, thunkApi) => {

    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allproduct/" + payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }

})

export const loginUserapi = createAsyncThunk('product/loginUserapi', async (payload, thunkApi) => {

    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/login", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getlogOutuserApi = createAsyncThunk('product/getlogOutuserApi', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/logOut", withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getLoginuserDetails = createAsyncThunk('product/getLoginuserDetails', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/profile", withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getRegisterUser = createAsyncThunk('product/getRegisterUser', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/register-user", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getChangePassword = createAsyncThunk('product/getChangePassword', async (payload, thunkApi) => {

    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/update_password", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getSendPasswordResetLink = createAsyncThunk('product/getSendPasswordResetLink', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/fogotPassword", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const forgotPasswordReset = createAsyncThunk('product/forgotPasswordReset', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "patch", url: "http://localhost:8080/api/v1/resetPassword", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getProductReviewApi = createAsyncThunk('product/getProductReviewApi', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/allReview/" + payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response)
    }
})

export const getVerifyOrderConfirmation = createAsyncThunk('product/getVerifyOrderConfirmation', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "post", url: "http://localhost:8080/api/v1/orderVarification/", data: payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.status)
    }
})

export const getorderByOrderId = createAsyncThunk('product/getorderByOrderId', async (payload, thunkApi) => {
    try {
        const response = await axios({ method: "get", url: "http://localhost:8080/api/v1/order/" + payload, withCredentials: true })
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.status)
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
        logOutUser: {},
        getUserDetails: {},
        RegisterUser: {},
        UpdatePassword: {},
        ForgotPasswordLink: {},
        Resetpassword: {},
        ProductReviews: {},
        OrderVerification: {},
        OrderByOrderid: {}
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

            .addCase(getLoginuserDetails.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getLoginuserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.getUserDetails = action.payload
            })
            .addCase(getLoginuserDetails.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.getUserDetails = action.payload
            })

            .addCase(getRegisterUser.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getRegisterUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.RegisterUser = action.payload
            })
            .addCase(getRegisterUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.RegisterUser = action.payload
            })

            .addCase(getSendPasswordResetLink.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getSendPasswordResetLink.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.UpdatePassword = action.payload
            })
            .addCase(getSendPasswordResetLink.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.UpdatePassword = action.payload
            })

            .addCase(forgotPasswordReset.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(forgotPasswordReset.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.Resetpassword = action.payload
            })
            .addCase(forgotPasswordReset.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.Resetpassword = action.payload
            })

            .addCase(getProductReviewApi.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getProductReviewApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ProductReviews = action.payload
            })
            .addCase(getProductReviewApi.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.ProductReviews = action.payload
            })

            .addCase(getVerifyOrderConfirmation.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getVerifyOrderConfirmation.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.OrderVerification = action.payload
            })
            .addCase(getVerifyOrderConfirmation.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.OrderVerification = action.payload
            })

            .addCase(getorderByOrderId.pending, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.isSuccess = false
            })
            .addCase(getorderByOrderId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.OrderByOrderid = action.payload
            })
            .addCase(getorderByOrderId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.OrderByOrderid = action.payload
            })
    },
})

export const { reset } = productSlice.actions
export default productSlice.reducer