import APIService from "./APIService";
import {useCallback, useReducer} from "react";
import {paginationToJ} from "../utils/utils";

export class ItemService extends APIService {
    constructor() {
        super("items");
    }

    async getItems(pagination) {
        const {data: result} = await this.get('', paginationToJ(pagination))
        return result
    }

    async createItem(data) {
        const {data: result} = await this.post('', data)
        return result
    }

    async deleteItem(id) {
        const {data: result} = await this.delete(`${id}`)
        return result
    }
}

const service = new ItemService()

export const ITEM_SERVICE_ACTIONS = {
    GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST",
    GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS",
    GET_ITEMS_FAILURE: "GET_ITEMS_FAILURE",
    CREATE_ITEM_REQUEST: "CREATE_ITEM_REQUEST",
    CREATE_ITEM_SUCCESS: "CREATE_ITEM_SUCCESS",
    CREATE_ITEM_FAILURE: "CREATE_ITEM_FAILURE",
    DELETE_ITEM_REQUEST: "DELETE_ITEM_REQUEST",
    DELETE_ITEM_SUCCESS: "DELETE_ITEM_SUCCESS",
    DELETE_ITEM_FAILURE: "DELETE_ITEM_FAILURE",
}

const initialState = {
    loading: false,
    items: [],
    items_error: null,
    created_item: null,
    create_error: null
}

export const itemServiceReducer = (state, action) => {
    switch (action.type) {
        case ITEM_SERVICE_ACTIONS.GET_ITEMS_REQUEST:
            return {
                ...state,
                pagination: action.payload.pagination,
                loading: true
            }
        case ITEM_SERVICE_ACTIONS.GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload || [],
                items_error: null,
                loading: false
            }
        case ITEM_SERVICE_ACTIONS.GET_ITEMS_FAILURE:
            return {
                ...state,
                items: [],
                items_error: action.error,
                loading: false
            }
        case ITEM_SERVICE_ACTIONS.CREATE_ITEM_REQUEST:
            return {
                ...state,
                created_item: null,
                create_error: null,
                loading: true
            }
        case ITEM_SERVICE_ACTIONS.CREATE_ITEM_SUCCESS:
            return {
                ...state,
                created_item: action.payload,
                loading: false,
            }
        case ITEM_SERVICE_ACTIONS.CREATE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                create_error: action.error
            }
        case ITEM_SERVICE_ACTIONS.DELETE_ITEM_REQUEST:
            return {
                ...state,
                delete_error: null,
                loading: true
            }
        case ITEM_SERVICE_ACTIONS.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case ITEM_SERVICE_ACTIONS.DELETE_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                delete_error: action.error
            }
    }
}

export const itemServiceActions = {
    getItems: (payload) => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_REQUEST, payload}),
    getItemsSuccess: payload => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_SUCCESS, payload}),
    getItemsFailure: error => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_FAILURE, error}),
    createItem: () => ({type: ITEM_SERVICE_ACTIONS.CREATE_ITEM_REQUEST}),
    createItemSuccess: payload => ({type: ITEM_SERVICE_ACTIONS.CREATE_ITEM_SUCCESS, payload}),
    createItemFailure: error => ({type: ITEM_SERVICE_ACTIONS.CREATE_ITEM_FAILURE, error}),
    deleteItem: () => ({type: ITEM_SERVICE_ACTIONS.DELETE_ITEM_REQUEST}),
    deleteItemSuccess: payload => ({type: ITEM_SERVICE_ACTIONS.DELETE_ITEM_SUCCESS, payload}),
    deleteItemFailure: error => ({type: ITEM_SERVICE_ACTIONS.DELETE_ITEM_FAILURE, error}),
}

export const useItems = () => {
    const [state, dispatch] = useReducer(itemServiceReducer, initialState);

    const getItems = useCallback(async (pagination) => {
        if (!pagination) pagination = state.pagination
        dispatch(itemServiceActions.getItems({pagination}))
        try {
            const response = await service.getItems(pagination)
            dispatch(itemServiceActions.getItemsSuccess(response))
        } catch (e) {
            console.error('cannot get items', e)
            dispatch(itemServiceActions.getItemsFailure(e))
        }
    })

    const createItem = useCallback(async (item, callback) => {
        dispatch(itemServiceActions.createItem())
        try {
            const response = await service.createItem(item)
            dispatch(itemServiceActions.createItemSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot create item', e)
            dispatch(itemServiceActions.createItemFailure(e))
        }
    })

    const deleteItem = useCallback(async (id, callback) => {
        dispatch(itemServiceActions.deleteItem())
        try {
            const response = await service.deleteItem(id)
            dispatch(itemServiceActions.createItemSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot delete item', e)
            dispatch(itemServiceActions.deleteItemFailure(e))
        }
    })

    return {state, getItems, createItem, deleteItem}
}