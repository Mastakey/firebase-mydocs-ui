import { GET_MYDOCS, SET_MYDOCS, LOADING_MYDOCS, GET_MYDOC, POST_MYDOC, SET_MYDOC, DELETE_MYDOC, SET_ERRORS, CLEAR_ERRORS } from '../types';
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

export const postMyDoc = (mydoc) => async (dispatch) => {
    dispatch({type: LOADING_MYDOCS});
    try {
        const mydocdata = await axios.post('/mydoc', mydoc);
        dispatch({
            type: POST_MYDOC,
            payload: mydocdata.data
        });
        dispatch({
            type: CLEAR_ERRORS,
            payload: []
        })
    } catch (err) {
        console.log(err);
    }
}