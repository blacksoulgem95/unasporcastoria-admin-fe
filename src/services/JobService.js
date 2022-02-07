import APIService from "./APIService";
import {useCallback, useReducer} from "react";
import {paginationToJ} from "../utils/utils";

export class JobService extends APIService {
    constructor() {
        super("jobs");
    }

    async getJobs(pagination) {
        const {data: result} = await this.get('', paginationToJ(pagination))
        return result
    }

    async createJob(data) {
        const {data: result} = await this.post('', data)
        return result
    }

    async deleteJob(id) {
        const {data: result} = await this.delete(`${id}`)
        return result
    }

    async updateJob(id, data) {
        const {data: result} = await this.put(`${id}`, data)
        return result
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
    DELETE_JOB_REQUEST: "CREATE_JOB_REQUEST",
    DELETE_JOB_SUCCESS: "CREATE_JOB_SUCCESS",
    DELETE_JOB_FAILURE: "CREATE_JOB_FAILURE",
    UPDATE_JOB_REQUEST: "UPDATE_JOB_REQUEST",
    UPDATE_JOB_SUCCESS: "UPDATE_JOB_SUCCESS",
    UPDATE_JOB_FAILURE: "UPDATE_JOB_FAILURE",
    DISMISS_UPDATE_FAILURE: "DISMISS_UPDATE_FAILURE",
}

const initialState = {
    loading: false,
    pagination: {},
    jobs: null,
    jobs_error: null,
    created_job: null,
    create_error: null,
    delete_error: null,
    update_error: null
}

export const jobServiceReducer = (state, action) => {
    switch (action.type) {
        case JOB_SERVICE_ACTIONS.GET_JOBS_REQUEST:
            return {
                ...state,
                pagination: action.payload.pagination,
                loading: true
            }
        case JOB_SERVICE_ACTIONS.GET_JOBS_SUCCESS:
            console.log(action)
            return {
                ...state,
                jobs: action.payload || {},
                jobs_error: null,
                loading: false
            };
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
                created_job: action.payload,
                loading: false,
            }
        case JOB_SERVICE_ACTIONS.CREATE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                create_error: action.error
            }
        case JOB_SERVICE_ACTIONS.DELETE_JOB_REQUEST:
            return {
                ...state,
                delete_error: null,
                loading: true
            }
        case JOB_SERVICE_ACTIONS.DELETE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case JOB_SERVICE_ACTIONS.DELETE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                delete_error: action.error
            }
        case JOB_SERVICE_ACTIONS.UPDATE_JOB_REQUEST:
            return {
                ...state,
                update_error: null,
                loading: true
            }
        case JOB_SERVICE_ACTIONS.UPDATE_JOB_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case JOB_SERVICE_ACTIONS.UPDATE_JOB_FAILURE:
            return {
                ...state,
                loading: false,
                update_error: action.error
            }
        case JOB_SERVICE_ACTIONS.DISMISS_UPDATE_FAILURE:
            return {
                ...state,
                update_error: null
            }
    }
}

export const jobServiceActions = {
    getJobs: (payload) => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_REQUEST, payload}),
    getJobsSuccess: payload => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_SUCCESS, payload}),
    getJobsFailure: error => ({type: JOB_SERVICE_ACTIONS.GET_JOBS_FAILURE, error}),
    createJob: () => ({type: JOB_SERVICE_ACTIONS.CREATE_JOB_REQUEST}),
    createJobSuccess: payload => ({type: JOB_SERVICE_ACTIONS.CREATE_JOB_SUCCESS, payload}),
    createJobFailure: error => ({type: JOB_SERVICE_ACTIONS.CREATE_JOB_FAILURE, error}),
    deleteJob: () => ({type: JOB_SERVICE_ACTIONS.DELETE_JOB_REQUEST}),
    deleteJobSuccess: payload => ({type: JOB_SERVICE_ACTIONS.DELETE_JOB_SUCCESS, payload}),
    deleteJobFailure: error => ({type: JOB_SERVICE_ACTIONS.DELETE_JOB_FAILURE, error}),
    updateJob: () => ({type: JOB_SERVICE_ACTIONS.UPDATE_JOB_REQUEST}),
    updateJobSuccess: payload => ({type: JOB_SERVICE_ACTIONS.UPDATE_JOB_SUCCESS, payload}),
    updateJobFailure: error => ({type: JOB_SERVICE_ACTIONS.UPDATE_JOB_FAILURE, error}),
    dismissUpdateFailure: () => ({type: JOB_SERVICE_ACTIONS.DISMISS_UPDATE_FAILURE})
}

export const useJobs = () => {
    const [state, dispatch] = useReducer(jobServiceReducer, initialState);

    const getJobs = useCallback(async (pagination) => {
        if (!pagination) pagination = state.pagination
        await dispatch(jobServiceActions.getJobs({pagination}))
        try {
            const response = await service.getJobs(pagination)
            dispatch(jobServiceActions.getJobsSuccess(response))
        } catch (e) {
            console.error('cannot get jobs', e)
            dispatch(jobServiceActions.getJobsFailure(e))
        }
    })

    const createJob = useCallback(async (job, callback) => {
        await dispatch(jobServiceActions.createJob())
        try {
            const response = await service.createJob(job)
            dispatch(jobServiceActions.createJobSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot create job', e)
            dispatch(jobServiceActions.createJobFailure(e))
        }
    })

    const deleteJob = useCallback(async (id, callback) => {
        dispatch(jobServiceActions.deleteJob())
        try {
            const response = await service.deleteJob(id)
            dispatch(jobServiceActions.deleteJobSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot delete job', e)
            dispatch(jobServiceActions.deleteJobFailure(e))
        }
    })

    const updateJob = useCallback(async (payload, callback) => {
        dispatch(jobServiceActions.updateJob())
        try {
            const response = await service.updateJob(payload.id, payload)
            dispatch(jobServiceActions.updateJobSuccess(response))
            callback ? callback() : null
            return response;
        } catch (e) {
            console.error('cannot delete job', e)
            dispatch(jobServiceActions.updateJobFailure(e))
            throw e
        }
    })

    const dismissUpdateFailure = useCallback(() => {
        dispatch(jobServiceActions.dismissUpdateFailure())
    })

    return {state, getJobs, createJob, deleteJob, updateJob, dismissUpdateFailure}
}