import {
  SET_MYDOCS,
  LOADING_MYDOCS,
    LOADING_MYDOC,
  SET_MYDOC,
  POST_MYDOC,
  EDIT_MYDOC,
  DELETE_MYDOC,
  SET_HISTORY
} from "../types";

const initialState = {
    mydocs: [],
    mydoc: {
        history: [],
        loading: false
    },
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
      case LOADING_MYDOCS:
        return {
          ...state,
          mydoc: {
            history: []
          },
          loading: true
        };
      case LOADING_MYDOC:
        return {
          ...state,
          mydoc: {
            ...state.mydoc,
            loading: true
          },
        };
      case SET_MYDOCS:
        return {
          ...state,
          mydocs: action.payload,
          loading: false
        };
      case POST_MYDOC:
        return {
          ...state,
          mydoc: action.payload,
          loading: false
        };
      case EDIT_MYDOC:
        return {
          ...state,
          mydoc: {
            ...action.payload,
            loading: false
          },
          loading: false
        };
      case SET_MYDOC:
        const delta = action.payload.delta ? action.payload.delta : null;
        return {
          ...state,
          mydoc: {
            history: state.mydoc.history,
            ...action.payload,
            delta: delta,
            loading: false
          },
          loading: false
        };
      case DELETE_MYDOC:
        return {
          ...state,
          mydoc: action.payload,
          loading: false
        };
      case SET_HISTORY:
        return {
          ...state,
          mydoc: {
            ...state.mydoc,
            history: action.payload
          },
          loading: false
        };
      default:
        return state;
    }
}