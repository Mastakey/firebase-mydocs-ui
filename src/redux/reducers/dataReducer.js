import { GET_MYDOCS, SET_MYDOCS, LOADING_MYDOCS, SET_MYDOC, POST_MYDOC, DELETE_MYDOC, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    mydocs: [],
    mydoc: {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_MYDOCS:
            return {
                ...state,
                loading: true
            }
        case SET_MYDOCS:
            return {
                ...state,
                mydocs: action.payload,
                loading: false
            }
        case POST_MYDOC:
            return {
                ...state,
                mydoc: action.payload
            }
        case SET_MYDOC:
            return {
                ...state,
                mydoc: action.payload,
                loading: false
            }
        default: return state;
    }
}