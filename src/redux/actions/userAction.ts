import { createAsyncThunk } from "@reduxjs/toolkit";
import { Login, verifyOtpRequest, verifyOtpResponse } from "../../types/AllTypes";
import { AXIOS_INSTANCE_AUTH } from "../../constants/axiosInstance";

// interface SignupRequest {
//   name: string,
//   email: string,
//   password: string,
// } 

interface ErrorPayload {
  message: string;
  // Other error details
}
interface User {
  email: string,
  name: string,
  password: string,
  role: string,
  otp: string,
}

interface ErrorPayload {
  message: string;
}



export const signupUser = createAsyncThunk<User, any, { rejectValue: ErrorPayload }>(
  'user/signup',
  async (userData: any, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE_AUTH.post('/signup', userData)
      return data
    } catch (error: any | Error) {
      console.log(error);
      return rejectWithValue(error.response.data)
    }
  }
)

export const verifyOtp = createAsyncThunk<verifyOtpResponse,verifyOtpRequest,{rejectValue: ErrorPayload}>(
  'user/verify-otp',
  async (req:verifyOtpRequest, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE_AUTH.post('/verify-otp', req)
      return data
    } catch (error: any) {
      return rejectWithValue(error)
    }
  }
)

export const login = createAsyncThunk<User, Login, { rejectValue: ErrorPayload }>(
  'user/login',
  async (loginData: Login, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE_AUTH.post('/login', loginData)
      return data
    } catch (error: any | Error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
)

export const googleLoginAndSignup = createAsyncThunk<any,any,{rejectValue:ErrorPayload}>(
  'user/google',
  async (payload: any, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE_AUTH.post('/google', { token: payload?.credential as string }, {
        withCredentials: true
      })
      return data
    } catch (error: Error | any) {
      console.log(error)
      return rejectWithValue(error)
    }
  }
)


export const logout = createAsyncThunk<any, any, { rejectValue: ErrorPayload }>(
  'user/logout',
  async (_: undefined, { rejectWithValue }) => {
    try {
      const { data } = await AXIOS_INSTANCE_AUTH.post('/logout', {}, { withCredentials: true })
      return data
    } catch (error: any | Error) {
      return rejectWithValue(error)
    }
  }
)