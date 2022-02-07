import APIService from "./APIService";
import {useCallback, useReducer} from "react";
import {paginationToJ} from "../utils/utils";

export class SkillService extends APIService {
    constructor() {
        super("skills");
    }

    async getSkills(pagination) {
        const {data: result} = await this.get('', paginationToJ(pagination))
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

    async updateSkill(id, data) {
        const {data: result} = await this.put(`${id}`, data)
        return result
    }
}

const service = new SkillService()

export const SKILL_SERVICE_ACTIONS = {
    GET_SKILLS_REQUEST: "GET_SKILLS_REQUEST",
    GET_SKILLS_SUCCESS: "GET_SKILLS_SUCCESS",
    GET_SKILLS_FAILURE: "GET_SKILLS_FAILURE",
    CREATE_SKILL_REQUEST: "CREATE_SKILL_REQUEST",
    CREATE_SKILL_SUCCESS: "CREATE_SKILL_SUCCESS",
    CREATE_SKILL_FAILURE: "CREATE_SKILL_FAILURE",
    DELETE_SKILL_REQUEST: "DELETE_SKILL_REQUEST",
    DELETE_SKILL_SUCCESS: "DELETE_SKILL_SUCCESS",
    DELETE_SKILL_FAILURE: "DELETE_SKILL_FAILURE",
    UPDATE_SKILL_REQUEST: "UPDATE_SKILL_REQUEST",
    UPDATE_SKILL_SUCCESS: "UPDATE_SKILL_SUCCESS",
    UPDATE_SKILL_FAILURE: "UPDATE_SKILL_FAILURE",
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
        case SKILL_SERVICE_ACTIONS.GET_SKILLS_REQUEST:
            return {
                ...state,
                pagination: action.payload.pagination,
                loading: true
            }
        case SKILL_SERVICE_ACTIONS.GET_SKILLS_SUCCESS:
            console.log(action)
            return {
                ...state,
                skills: action.payload.response || {},
                pagination: action.payload.pagination,
                skills_error: null,
                loading: false
            };
        case SKILL_SERVICE_ACTIONS.GET_SKILLS_FAILURE:
            return {
                ...state,
                skills: [],
                skills_error: action.error,
                loading: false
            }
        case SKILL_SERVICE_ACTIONS.CREATE_SKILL_REQUEST:
            return {
                ...state,
                created_skill: null,
                create_error: null,
                loading: true
            }
        case SKILL_SERVICE_ACTIONS.CREATE_SKILL_SUCCESS:
            return {
                ...state,
                created_skill: action.payload,
                loading: false,
            }
        case SKILL_SERVICE_ACTIONS.CREATE_SKILL_FAILURE:
            return {
                ...state,
                loading: false,
                create_error: action.error
            }
        case SKILL_SERVICE_ACTIONS.DELETE_SKILL_REQUEST:
            return {
                ...state,
                delete_error: null,
                loading: true
            }
        case SKILL_SERVICE_ACTIONS.DELETE_SKILL_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SKILL_SERVICE_ACTIONS.DELETE_SKILL_FAILURE:
            return {
                ...state,
                loading: false,
                delete_error: action.error
            }
        case SKILL_SERVICE_ACTIONS.UPDATE_SKILL_REQUEST:
            return {
                ...state,
                update_error: null,
                loading: true
            }
        case SKILL_SERVICE_ACTIONS.UPDATE_SKILL_SUCCESS:
            return {
                ...state,
                loading: false,
            }
        case SKILL_SERVICE_ACTIONS.UPDATE_SKILL_FAILURE:
            return {
                ...state,
                loading: false,
                update_error: action.error
            }
    }
}

export const skillServiceActions = {
    getSkills: (payload) => ({type: SKILL_SERVICE_ACTIONS.GET_SKILLS_REQUEST, payload}),
    getSkillsSuccess: payload => ({type: SKILL_SERVICE_ACTIONS.GET_SKILLS_SUCCESS, payload}),
    getSkillsFailure: error => ({type: SKILL_SERVICE_ACTIONS.GET_SKILLS_FAILURE, error}),
    createSkill: () => ({type: SKILL_SERVICE_ACTIONS.CREATE_SKILL_REQUEST}),
    createSkillSuccess: payload => ({type: SKILL_SERVICE_ACTIONS.CREATE_SKILL_SUCCESS, payload}),
    createSkillFailure: error => ({type: SKILL_SERVICE_ACTIONS.CREATE_SKILL_FAILURE, error}),
    deleteSkill: () => ({type: SKILL_SERVICE_ACTIONS.DELETE_SKILL_REQUEST}),
    deleteSkillSuccess: payload => ({type: SKILL_SERVICE_ACTIONS.DELETE_SKILL_SUCCESS, payload}),
    deleteSkillFailure: error => ({type: SKILL_SERVICE_ACTIONS.DELETE_SKILL_FAILURE, error}),
    updateSkill: () => ({type: SKILL_SERVICE_ACTIONS.UPDATE_SKILL_REQUEST}),
    updateSkillSuccess: payload => ({type: SKILL_SERVICE_ACTIONS.UPDATE_SKILL_SUCCESS, payload}),
    updateSkillFailure: error => ({type: SKILL_SERVICE_ACTIONS.UPDATE_SKILL_FAILURE, error}),
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

    const updateSkill = useCallback(async (data, callback) => {
        await dispatch(skillServiceActions.updateSkill())
        try {
            const response = await service.updateSkill(data.id, data)
            dispatch(skillServiceActions.updateSkillSuccess(response))
            callback ? callback() : null
            return response
        } catch (e) {
            console.error('cannot delete skill', e)
            dispatch(skillServiceActions.updateSkillFailure(e))
            throw e
        }
    })

    return {state, getSkills, createSkill, deleteSkill, updateSkill}
}