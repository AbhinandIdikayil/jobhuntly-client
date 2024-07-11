import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { ErrorPayload, UserReducer } from '../../../types/AllTypes'
import { googleLoginAndSignup, login, logout, signupUser, verifyOtp } from '../../actions/userAction'

const initialState: UserReducer = {
    loading: false,
    user: null,
    err: false,
    role: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: (state) => {
            state.user = null
            state.role = null
            state.loading = false
            state.err = false
        },
        resetErr: (state) => {
            state.err = false
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<UserReducer>) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true
                state.err = false
                state.role = null
                state.user = null
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false
                state.err = false
                state.role = null
                state.user = null
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.err = (action.payload as ErrorPayload).message;
                } else {
                    state.err = action.error.message || 'An unknown error occurred';
                }
                state.role = null
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
                state.err = false
                state.role = payload.role as 'user' | 'company' | 'admin'
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.err = (action.payload as ErrorPayload).message
                } else {
                    state.err = action.error.message || 'An unknown error occured'
                }
            })
            .addCase(googleLoginAndSignup.pending, (state) => {
                state.loading = true
                state.role = null
            })
            .addCase(googleLoginAndSignup.fulfilled, (state, { payload }) => {
                state.loading = false
                state.err = false
                state.user = payload
                state.role = payload?.role as 'user' | 'company' | 'admin'
            })
            .addCase(googleLoginAndSignup.rejected, (state, action) => {
                state.loading = false
                state.role = null
                if (action.payload) {
                    state.err = (action.payload as ErrorPayload).message
                } else {
                    state.err = action.error.message || 'An unknown error occured'
                }
            })
            .addCase(logout.pending,(state) => {
                state.loading = true
                state.role = null
            })
            .addCase(logout.fulfilled,(state) => {
                state.loading = false
                state.user = null
                state.role = null
                state.err = false
            })
            .addCase(logout.rejected,(state,{payload}) => {
                state.loading = false
                state.err = payload?.message || 'error occured' 
            })
            .addCase(verifyOtp.pending,(state) => {
                state.loading = true
                state.err = false
                state.role = null
                state.user = null
            })
            .addCase(verifyOtp.fulfilled,(state,{payload}) => {
                state.loading = false
                state.err = false
                state.role = payload?.role as 'user' | 'company' | 'admin'
                state.user = payload
            })
            .addCase(verifyOtp.rejected,(state,{payload}) => {
                state.loading = false
                state.err = payload?.message || 'error occured' 
                state.role = null
                state.user = null
            })
    }
})


export const { resetState , resetErr } = userSlice.actions

export default userSlice.reducer