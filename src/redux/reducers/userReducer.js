import { SET_AUTH, SET_UNAUTH, SET_USER, LOADING_USER, SIGNUP_USER } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTH:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTH: 
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case SIGNUP_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}