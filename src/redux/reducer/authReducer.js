import token from '../../components/axios';
import {FETCH_USER_REQUEST,FETCH_USER_FAILURE, FETCH_USER_SUCCESS,LOGOUT} from '../type/authType';

const initialState = {
  loading: false,
  isSignin:false,
  user: null,
  // token:null,
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        isSignin:true,
        user: action.payload,
        error: '',
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        loading: false,
        user: null,
        error: '',
      };
    
    default:
      return state;
  }
};

export default authReducer;
