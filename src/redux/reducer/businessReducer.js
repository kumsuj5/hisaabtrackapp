import {
  FETCH_BUSINESS_FAILURE,
  FETCH_BUSINESS_REQUEST,
  FETCH_BUSINESS_SUCCESS,
} from '../type/businessType';

const initialState = {
  loading: false,
  business: [],
  error: '',
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BUSINESS_SUCCESS:
      return {
        ...state,
        loading: false,
        business: action.payload,
        error: '',
      };
    case FETCH_BUSINESS_FAILURE:
      return {
        ...state,
        loading: false,
        business: [],
        error: action.payload,
      };
    default:
      return state;
  }
};


export default businessReducer