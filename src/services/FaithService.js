import APIService from "./APIService";
import {useCallback, useReducer} from "react";
import {defaultPagination, paginationToJ} from "../utils/utils";

export class FaithService extends APIService {
    constructor() {
        super("faiths");
    }

    async getFaiths(pagination) {
        const {data: result} = await this.get('', paginationToJ(pagination))
        return result
    }

    async createFaith(data) {
        const {data: result} = await this.post('', data)
        return result
    }

    async deleteFaith(id) {
        const {data: result} = await this.delete(`${id}`)
        return result
    }
}

const service = new FaithService()

export const FAITH_SERVICE_ACTIONS = {
    GET_FAITHS_REQUEST: "GET_FAITHS_REQUEST",
    GET_FAITHS_SUCCESS: "GET_FAITHS_SUCCESS",
    GET_FAITHS_FAILURE: "GET_FAITHS_FAILURE",
    CREATE_FAITH_REQUEST: "CREATE_FAITH_REQUEST",
    CREATE_FAITH_SUCCESS: "CREATE_FAITH_SUCCESS",
    CREATE_FAITH_FAILURE: "CREATE_FAITH_FAILURE",
    DELETE_FAITH_REQUEST: "DELETE_FAITH_REQUEST",
    DELETE_FAITH_SUCCESS: "DELETE_FAITH_SUCCESS",
    DELETE_FAITH_FAILURE: "DELETE_FAITH_FAILURE",
}

const initialState = {
    loading: false,
    faiths: null,
    pagination: defaultPagination(),
    faiths_error: null,
    created_faith: null,
    create_error: null
}

export const faithServiceReducer = (state, action) => {
    switch (action.type) {
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_REQUEST:
            return {
                ...state,
                pagination: action.payload.pagination,
                loading: true
            }
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS:
            console.log(action)
            return {
                ...state,
                faiths: action.payload.response || {},
                faiths_error: null,
                loading: false
            };
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE:
            return {
                ...state,
                faiths: [],
                faiths_error: action.error,
                loading: false
            }
        case FAITH_SERVICE_ACTIONS.CREATE_FAITH_REQUEST:
            return {
                ...state,
                created_faith: null,
                create_error: null,
                loading: true
            }
        case FAITH_SERVICE_ACTIONS.CREATE_FAITH_SUCCESS:
            return {
                ...state,
                created_faith: action.payload,
                loading: false,
            }
        case FAITH_SERVICE_ACTIONS.CREATE_FAITH_FAILURE:
            return {
                ...state,
                loading: false,
                create_error: action.error
            }
        case FAITH_SERVICE_ACTIONS.DELETE_FAITH_REQUEST:
            return {
                ...state,
                delete_error: null,
                loading: true
            }
        case FAITH_SERVICE_ACTIONS.DELETE_FAITH_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case FAITH_SERVICE_ACTIONS.DELETE_FAITH_FAILURE:
            return {
                ...state,
                loading: false,
                delete_error: action.error
            }
    }
}

export const faithServiceActions = {
    getFaiths: (payload) => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_REQUEST, payload}),
    getFaithsSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS, payload}),
    getFaithsFailure: error => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE, error}),
    createFaith: () => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_REQUEST}),
    createFaithSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_SUCCESS, payload}),
    createFaithFailure: error => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_FAILURE, error}),
    deleteFaith: () => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_REQUEST}),
    deleteFaithSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_SUCCESS, payload}),
    deleteFaithFailure: error => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_FAILURE, error}),
}

export const useFaiths = () => {
    const [state, dispatch] = useReducer(faithServiceReducer, initialState);

    const getFaiths = useCallback(async (pagination) => {
        if (!pagination) pagination = state.pagination
        await dispatch(faithServiceActions.getFaiths({pagination}))
        try {
            const response = await service.getFaiths(pagination)
            dispatch(faithServiceActions.getFaithsSuccess({response, pagination}))
        } catch (e) {
            console.error('cannot get faiths', e)
            dispatch(faithServiceActions.getFaithsFailure(e))
        }
    })

    const createFaith = useCallback(async (faith, callback) => {
        await dispatch(faithServiceActions.createFaith())
        try {
            const response = await service.createFaith(faith)
            dispatch(faithServiceActions.createFaithSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot create faith', e)
            dispatch(faithServiceActions.createFaithFailure(e))
        }
    })

    const deleteFaith = useCallback(async (id, callback) => {
        await dispatch(faithServiceActions.deleteFaith())
        try {
            const response = await service.deleteFaith(id)
            dispatch(faithServiceActions.deleteFaithSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot delete faith', e)
            dispatch(faithServiceActions.deleteFaithFailure(e))
        }
    })

    return {state, getFaiths, createFaith, deleteFaith}
}