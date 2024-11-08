import {
    FETCH_BUSINESS_FAILURE,
    FETCH_BUSINESS_REQUEST,
    FETCH_BUSINESS_SUCCESS,
  } from '../type/businessType';
  import axios from '../../components/axios';
  
  // Action creators
  export const fetchBusinessRequest = () => ({
    type: FETCH_BUSINESS_REQUEST,
  });   
  
  export const fetchBusinessSuccess = (businessData) => ({
    type: FETCH_BUSINESS_SUCCESS,
    payload: businessData,
  });
  
  export const fetchBusinessFailure = (error) => ({
    type: FETCH_BUSINESS_FAILURE,
    payload: error,
  });
  
  // Async action to fetch business data
  export const fetchBusiness = () => {
    return async (dispatch, getState) => {
      dispatch(fetchBusinessRequest());
  
      try {
        const token = getState().auth.user.token;

        const response = await axios(token).get(`/allBusiness`);
        
        dispatch(fetchBusinessSuccess(response.data));
      } catch (error) {
       
        console.log(error)
        dispatch(fetchBusinessFailure(error.message));
      }
    };
  };
  