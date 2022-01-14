import APIService from "./APIService";
import {useCallback, useReducer} from "react";

export class ItemService extends APIService {
    constructor() {
        super("items");
    }

    async getItems(pagination) {
        const response = await this.get('', pagination)
        return response.json()
    }

    async createItem(data) {
        const response = await this.post('', data)
        return response.json()
    }
}

const service = new ItemService()

export const ITEM_SERVICE_ACTIONS = {
    GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST",
    GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS",
    GET_ITEMS_FAILURE: "GET_ITEMS_FAILURE"
}

const initialState = {
    loading: false,
    items: [],
    items_error: null
}

export const itemServiceReducer = (state, action) => {
    switch (action.type) {
        case ITEM_SERVICE_ACTIONS.GET_ITEMS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ITEM_SERVICE_ACTIONS.GET_ITEMS_SUCCESS:
            return {
                ...state,
                items: action.data || [],
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
    }
}

export const itemServiceActions = {
    getItems: () => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_REQUEST}),
    getItemsSuccess: data => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_SUCCESS, data}),
    getItemsFailure: error => ({type: ITEM_SERVICE_ACTIONS.GET_ITEMS_FAILURE, error})
}

export const useItems = () => {
    const [state, dispatch] = useReducer(itemServiceReducer, initialState);

    const getItems = useCallback(async (pagination) => {
        dispatch(itemServiceActions.getItems())
        try {
            const response = await service.getItems(pagination)
            dispatch(itemServiceActions.getItemsSuccess(response))
        } catch (e) {
            console.error('cannot get items', e)
            dispatch(itemServiceActions.getItemsFailure(e))
        }
    })

    return {state, getItems}
}