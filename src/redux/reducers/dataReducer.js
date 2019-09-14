import { GET_MYDOCS, SET_MYDOCS, LOADING_MYDOCS, GET_MYDOC, POST_MYDOC, SET_MYDOC, DELETE_MYDOC, SET_ERRORS, CLEAR_ERRORS } from '../types';

const initialState = {
    mydocs: [],
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
        default: return state;
    }
}