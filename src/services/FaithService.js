import APIService from "./APIService";
import {useCallback, useReducer} from "react";

export class FaithService extends APIService {
    constructor() {
        super("faiths");
    }

    async getFaiths(pagination) {
        const {data: result} = await this.get('', pagination)
        return result
    }

    async createFaith(data) {
        const {data: result} = await this.post('', data)
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
}

const initialState = {
    loading: false,
    faiths: null,
    pagination: null,
    faiths_error: null,
    created_faith: null,
    create_error: null
}

export const faithServiceReducer = (state, action) => {
    switch (action.type) {
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS:
            console.log(action)
            return {
                ...state,
                faiths: action.payload.response || {},
                pagination: action.payload.pagination,
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
    }
}

export const faithServiceActions = {
    getFaiths: () => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_REQUEST}),
    getFaithsSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS, payload}),
    getFaithsFailure: error => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE, error}),
    createFaith: () => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_REQUEST}),
    createFaithSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS, payload}),
    createFaithFailure: error => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE, error}),
}

export const useFaiths = () => {
    const [state, dispatch] = useReducer(faithServiceReducer, initialState);

    const getFaiths = useCallback(async (pagination) => {
        await dispatch(faithServiceActions.getFaiths())
        if (!pagination) pagination = state.pagination
        try {
            const response = await service.getFaiths(pagination)
            dispatch(faithServiceActions.getFaithsSuccess({response, pagination}))
        } catch (e) {
            console.error('cannot get faiths', e)
            dispatch(faithServiceActions.getFaithsFailure(e))
        }
    })

    const createFaith = useCallback(async (faith) => {
        await dispatch(faithServiceActions.createFaith())
        try {
            const response = await service.createFaith(faith)
            dispatch(faithServiceActions.createFaithSuccess(response))
        } catch (e) {
            console.error('cannot create faith', e)
            dispatch(faithServiceActions.createFaithFailure(e))
        }
    })

    return {state, getFaiths, createFaith}
}