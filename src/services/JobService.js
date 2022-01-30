import APIService from "./APIService";
import {useCallback, useReducer} from "react";

export class JobService extends APIService {
    constructor() {
        super("jobs");
    }

    async getJobs(pagination) {
        const response = await this.get('', pagination)
        return response.json()
    }

    async createJob(data) {
        const response = await this.post('', data)
        return response.json()
    }
}

const service = new JobService()

export const JOB_SERVICE_ACTIONS = {
    GET_JOBS_REQUEST: "GET_JOBS_REQUEST",
    GET_JOBS_SUCCESS: "GET_JOBS_SUCCESS",
    GET_JOBS_FAILURE: "GET_JOBS_FAILURE",
    CREATE_JOB_REQUEST: "CREATE_JOB_REQUEST",
    CREATE_JOB_SUCCESS: "CREATE_JOB_SUCCESS",
    CREATE_JOB_FAILURE: "CREATE_JOB_FAILURE",
}

const initialState = {
    loading: false,
    jobs: [],
    jobs_error: null,
    created_job: null,
    create_error: null
}

export const jobServiceReducer = (state, action) => {
    switch (action.type) {
        case JOB_SERVICE_ACTIONS.GET_JOBS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case JOB_SERVICE_ACTIONS.GET_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.data || [],
                jobs_error: null,
                loading: false
            }
        case JOB_SERVICE_ACTIONS.GET_JOBS_FAILURE:
            return {
                ...state,
                jobs: [],
                jobs_error: action.error,
                loading: false
            }
        case JOB_SERVICE_ACTIONS.CREATE_JOB_REQUEST:
            return {
                ...state,
                created_job: null,
                create_error: null,
                loading: true
            }
        case JOB_SERVICE_ACTIONS.CREATE_JOB_SUCCESS:
            return {
                ...state,
                created_job: action.data,
                loading: false,
            }
        case JOB_SERVICE_ACTIONS.CREATE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                create_error: action.error
            }
    }
}

export const jobServiceActions = {
    getJobs: () => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_REQUEST}),
    getJobsSuccess: data => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_SUCCESS, data}),
    getJobsFailure: error => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_FAILURE, error}),
    createJob: () => ({type: JOB_SERVICE_ACTIONS.CREATE_JOB_REQUEST}),
    createJobSuccess: data => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_SUCCESS, data}),
    createJobFailure: error => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_FAILURE, error}),
}

export const useJobs = () => {
    const [state, dispatch] = useReducer(jobServiceReducer, initialState);

    const getJobs = useCallback(async (pagination) => {
        dispatch(jobServiceActions.getJobs())
        try {
            const response = await service.getJobs(pagination)
            dispatch(jobServiceActions.getJobsSuccess(response))
        } catch (e) {
            console.error('cannot get jobs', e)
            dispatch(jobServiceActions.getJobsFailure(e))
        }
    })

    const createJob = useCallback(async (job) => {
        dispatch(jobServiceActions.createJob())
        try {
            const response = await service.createJob(job)
            dispatch(jobServiceActions.createJobSuccess(response))
        } catch (e) {
            console.error('cannot create job', e)
            dispatch(jobServiceActions.createJobFailure(e))
        }
    })

    return {state, getJobs, createJob}
}