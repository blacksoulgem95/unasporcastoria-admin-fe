import APIService from "./APIService";
import {useCallback, useReducer} from "react";

export class SkillService extends APIService {
    constructor() {
        super("skills");
    }

    async getSkills(pagination) {
        const {data: result} = await this.get('', pagination)
        return result
    }

    async createSkill(data) {
        const {data: result} = await this.post('', data)
        return result
    }

    async deleteSkill(id) {
        const {data: result} = await this.delete(`${id}`)
        return result
    }
}

const service = new SkillService()

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
    skills: null,
    pagination: null,
    skills_error: null,
    created_skill: null,
    create_error: null
}

export const skillServiceReducer = (state, action) => {
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
                skills: action.payload.response || {},
                pagination: action.payload.pagination,
                skills_error: null,
                loading: false
            };
        case FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE:
            return {
                ...state,
                skills: [],
                skills_error: action.error,
                loading: false
            }
        case FAITH_SERVICE_ACTIONS.CREATE_FAITH_REQUEST:
            return {
                ...state,
                created_skill: null,
                create_error: null,
                loading: true
            }
        case FAITH_SERVICE_ACTIONS.CREATE_FAITH_SUCCESS:
            return {
                ...state,
                created_skill: action.payload,
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

export const skillServiceActions = {
    getSkills: (payload) => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_REQUEST, payload}),
    getSkillsSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_SUCCESS, payload}),
    getSkillsFailure: error => ({type: FAITH_SERVICE_ACTIONS.GET_FAITHS_FAILURE, error}),
    createSkill: () => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_REQUEST}),
    createSkillSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_SUCCESS, payload}),
    createSkillFailure: error => ({type: FAITH_SERVICE_ACTIONS.CREATE_FAITH_FAILURE, error}),
    deleteSkill: () => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_REQUEST}),
    deleteSkillSuccess: payload => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_SUCCESS, payload}),
    deleteSkillFailure: error => ({type: FAITH_SERVICE_ACTIONS.DELETE_FAITH_FAILURE, error}),
}

export const useSkills = () => {
    const [state, dispatch] = useReducer(skillServiceReducer, initialState);

    const getSkills = useCallback(async (pagination) => {
        if (!pagination) pagination = state.pagination
        await dispatch(skillServiceActions.getSkills({pagination}))
        try {
            const response = await service.getSkills(pagination)
            dispatch(skillServiceActions.getSkillsSuccess({response, pagination}))
        } catch (e) {
            console.error('cannot get skills', e)
            dispatch(skillServiceActions.getSkillsFailure(e))
        }
    })

    const createSkill = useCallback(async (skill, callback) => {
        await dispatch(skillServiceActions.createSkill())
        try {
            const response = await service.createSkill(skill)
            dispatch(skillServiceActions.createSkillSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot create skill', e)
            dispatch(skillServiceActions.createSkillFailure(e))
        }
    })

    const deleteSkill = useCallback(async (id, callback) => {
        await dispatch(skillServiceActions.deleteSkill())
        try {
            const response = await service.deleteSkill(id)
            dispatch(skillServiceActions.deleteSkillSuccess(response))
            callback ? callback() : null
        } catch (e) {
            console.error('cannot delete skill', e)
            dispatch(skillServiceActions.deleteSkillFailure(e))
        }
    })

    return {state, getSkills, createSkill, deleteSkill}
}