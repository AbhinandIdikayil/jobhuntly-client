import { createAsyncThunk } from "@reduxjs/toolkit";
import { AXIOS_INSTANCE_JOB } from "src/constants/axiosInstance";
import { handleTokenError } from "src/utils/HandleError";


export const postJob = createAsyncThunk(
    'company/post-job',
    async (req: any, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.post('/post-job', req);
            return data;
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export type paginationAndFilter = {
    price?: number[],
    name?: string,
    pageSize?: number,
    page?: number,
    category?: string[] | undefined,
    employment?: string[] | undefined,
    location?: string,
    _id?: string  //! HERE THE ID IS USED TO GET THE JOBS THAT ARE BY A SPECIFIED COMPNAY
    //! IF USER SIDE IS USING THE API DONT PASS THE ID
}

export const getAllJob = createAsyncThunk(
    'list-job',
    async (req: paginationAndFilter | undefined, { rejectWithValue }) => {
        try {
            let res
            if (req?._id) {
                res = await AXIOS_INSTANCE_JOB.get(`/all-job/${req?._id}`, {
                    params: {
                        page: req.page,
                        pageSize: req.pageSize,
                        name: req.name,
                    }
                })
            } else {
                res = await AXIOS_INSTANCE_JOB.get(`/jobs`, {
                    params: {
                        page: req?.page,
                        pageSize: req?.pageSize,
                        name: req?.name,
                        category: req?.category,
                        employment: req?.employment,
                        price: req?.price,
                        location: req?.location
                    }
                })
            }
            const { data } = res
            return data
        } catch (error: any) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const applyJob = createAsyncThunk(
    'user/apply',
    async (req: any, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.post('/apply-job', req)
            return data
        } catch (error: any) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const getJobDetails = createAsyncThunk(
    'job/details',
    async (req: string, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.get(`/details/${req}`)
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const removeJob = createAsyncThunk(
    'job/remove',
    async (req: string, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.delete(`/post-job/${req}`)
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const updateJob = createAsyncThunk(
    'job/edit',
    async (req: any, { rejectWithValue }) => {
        try {
            console.log(req)
            const { data } = await AXIOS_INSTANCE_JOB.put(`/post-job/${req.id}`, req)
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const listApplications = createAsyncThunk(
    'applications/list',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.get(`/application`)
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const listApplicants = createAsyncThunk(
    'applicants/list',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.get('/applicant')
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const getSpecificApplicantDetails = createAsyncThunk(
    'applicant/details',
    async (req: string, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.get(`/applicant/${req}`)
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

type hiring = {
    applicationId: string,
    status: string | boolean | null
}


export const updateHiringStatus = createAsyncThunk(
    'applicant/hiring-status',
    async (req: hiring, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.put(`/application/${req.applicationId}`, {status:req.status})
            return {
                id: data?._id, hiring_status: data.hiring_status
            }
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const scheduleInterview = createAsyncThunk(
    'applicant/schedule-interview',
    async (req: any, { rejectWithValue }) => {
        try {
            const { data } = await AXIOS_INSTANCE_JOB.put(`/schedule-interview/${req.id}`, req)
            return data;
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const editInterview = createAsyncThunk(
    'company/edit-interview',
    async (req:any,{rejectWithValue}) => {
        try {
            const {data} = await AXIOS_INSTANCE_JOB.patch(`/schedule-interview/${req.id}`, req)
            return data;
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)

export const recommendedJobs = createAsyncThunk(
    'user/recommeded',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await AXIOS_INSTANCE_JOB.get('/recommend')
            return data
        } catch (error) {
            return rejectWithValue(handleTokenError(error))
        }
    }
)