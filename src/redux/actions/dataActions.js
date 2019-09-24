import {
  GET_MYDOCS,
  SET_MYDOCS,
  LOADING_MYDOCS,
    LOADING_MYDOC,
  LOADING_UI,
  GET_MYDOC,
  POST_MYDOC,
  EDIT_MYDOC,
  SET_MYDOC,
  DELETE_MYDOC,
  SET_ERRORS,
  SET_HISTORY,
  CLEAR_ERRORS
} from "../types";
import axios from 'axios';

export const getMyDocs = () => async (dispatch) => {
    dispatch({type: LOADING_MYDOCS});
    try {
        const mydocs = await axios.get(`/mydoc`);
        //console.log(mydocs.data);
        dispatch({
            type: SET_MYDOCS,
            payload: mydocs.data
        });
    }
    catch (err) {
        dispatch({
            type: SET_MYDOCS,
            payload: []
        });
    }
}

export const postMyDoc = (mydoc, history) => async (dispatch) => {
    dispatch({type: LOADING_UI});
    try {
        const mydocdata = await axios.post('/mydoc', mydoc);
        mydoc.delta = JSON.stringify(mydoc.delta);
        dispatch({
            type: POST_MYDOC,
            payload: mydocdata.data
        });
        history.push('/');
        dispatch({
            type: CLEAR_ERRORS,
            payload: []
        });
    } catch (err) {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
        console.log(err);
    }
}

export const editMyDoc = (id, mydoc) => async (dispatch) => {
    dispatch({ type: LOADING_MYDOC });
    mydoc.contentUpdated = true;
    mydoc.delta = JSON.stringify(mydoc.delta);
    try {
        const mydocdata = await axios.put(`/mydoc/${id}`, mydoc);
        dispatch({
            type: EDIT_MYDOC,
            payload: mydocdata.data
        });
        dispatch({
            type: CLEAR_ERRORS,
            payload: []
        });
    } catch (err) {
        console.log(err);
    }
}

export const getMyDoc = (id) => async (dispatch) => {
    dispatch({type: LOADING_MYDOCS});
    try {
        const mydoc = await axios.get(`/mydoc/${id}`);
        dispatch({
            type: SET_MYDOC,
            payload: mydoc.data
        })
    }
    catch(err){
        dispatch({
            type: SET_MYDOC,
            payload: {}
        })
    }
}

export const deleteMyDoc = (id, history) => async (dispatch) => {
    dispatch({type: LOADING_MYDOCS});
    try {
        await axios.delete(`/mydoc/${id}`);
        dispatch({
          type: DELETE_MYDOC,
          payload: {}
        });
        history.push("/");
    }
    catch (err) {
        dispatch({
            type: SET_MYDOC,
            payload: {}
        })
    }
}

export const getMyDocHistory = (id) => async (dispatch) => {
    try {
        const mydoc = await axios.get(`/mydoc/history/${id}`);
        dispatch({
            type: SET_HISTORY,
            payload: mydoc.data
        })
    }
    catch (err) {
        dispatch({
            type: SET_HISTORY,
            payload: []
        })
    }
}