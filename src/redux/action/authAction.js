// import axios from 'axios';
// import SInfo from 'react-native-sensitive-info';

// import {
//   FETCH_USER_FAILURE,
//   FETCH_USER_REQUEST,
//   FETCH_USER_SUCCESS,
//   LOGOUT
// } from '../type/authType';
// import { Alert, LogBox } from 'react-native';

// export const fetchUserRequest = () => {
//   return {
//     type: FETCH_USER_REQUEST,
//   };
// };

// export const fetchUserSuccess = (token,user_email,user_name) => {
//   return {
//     type: FETCH_USER_SUCCESS,
//     payload: {token,user_email,user_name},
//   };
// };

// export const fetchUserFailure = error => {
//   return {
//     type: FETCH_USER_FAILURE,
//     payload: error,
//   };
// };

// export const logout = () =>{
//   return{
//     type:LOGOUT
//   }
// }

// export const login = (email, password) => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//     // console.log(email,password)
//     axios.post('http://10.0.2.2:8000/api/login', { email, password }).then((response)=>{
//         const users = response.data;
//         dispatch(fetchUserSuccess(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email));
//         console.log(users.data.user_name);
//         saveAsync(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email,)
//     }).catch((error) => {
//         const errormsg = error.message;
//         console.log(errormsg)
//         dispatch(fetchUserFailure(errormsg));
//         Alert.alert('please fill all info currect')
//     });
//   };
// };
// export const register = (name, email, password, password_confirmation) => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//     axios.post('http://10.0.2.2:8000/api/register', { name, email, password, password_confirmation })
//       .then((response) => {
//         const users = response.data;
//         console.log(users)
//         dispatch(fetchUserSuccess(users.data.token, users.data.user_id, users.data.user_name, users.data.user_email));
//         saveAsync(users.data.token, users.data.user_id, users.data.user_name, users.data.user_email);
//       })
//       .catch((error) => {
//         const errormsg = error.response?.data?.message || error.message;
//         console.log(errormsg);
//         dispatch(fetchUserFailure(errormsg));
//         Alert.alert('Registration failed', errormsg);
//       });
//   };
// };

// const saveAsync = async (token,user_email,user_name,user_id)=>{
// // console.log(token,user_name,email,user_id)
// try {
//   await SInfo.setItem('data', JSON.stringify({ token: token, user_id: user_id, user_name: user_name, user_email:user_email }), {
//       sharedPreferencesName: 'mySharedPrefs',
//       keychainService: 'myKeychain'
//   });
//   console.log('Data successfully saved')
// } catch (e) {
//   console.log('Failed to save the data to the storage')
// }
// }

import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

import {
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGOUT,
} from '../type/authType';
import {Alert, LogBox} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
export const fetchUserSuccess = (
  token,
  user_email,
  user_name,
  user_id,
  profile_path,
) => {
  return {
    type: 'FETCH_USER_SUCCESS',
    payload: {
      token,
      user_email,
      user_name,
      user_id,
      profile_path, // added profile_path
    },
  };
};

export const fetchUserFailure = error => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(fetchUserRequest());
    // console.log(email,password)
    axios
      .post('http://10.0.2.2:8000/api/login', {email, password})
      .then(response => {
        const users = response.data;
        console.log(users);
        dispatch(
          fetchUserSuccess(
            users.data.token,
            users.data.user_email,
            users.data.user_name,
            users.data.user_id,
            users.data.profile_path, // added profile_path
          ),
        );
        console.log(
          fetchUserSuccess(
            users.data.token,
            users.data.user_email,
            users.data.user_name,
            users.data.user_id,
            users.data.profile_path,
          ),
        );
        saveAsync(
          users.data.token,
          users.data.user_id,
          users.data.user_name,
          users.data.user_email,
          users.data.profile_path, // saving profile_path
        );
      })
      .catch(error => {
        const errormsg = error.message;
        console.log(errormsg);
        dispatch(fetchUserFailure(errormsg));
        Alert.alert('please fill all info currect');
      });
  };
};
export const register = (
  name,
  email,
  password,
  password_confirmation,
  image,
) => {
  return dispatch => {
    dispatch(fetchUserRequest());

    const formData = [
      {name: 'name', data: name},
      {name: 'email', data: email},
      {name: 'password', data: password},
      {name: 'password_confirmation', data: password_confirmation},
      {
        name: 'profile_path',
        filename: image.name || 'profile.jpg',
        data: RNFetchBlob.wrap(image.replace('file://', '')),
      },
    ];

    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2:8000/api/register',
      {
        'Content-Type': 'multipart/form-data',
      },
      formData,
    )
      .then(response => {
        // const users = JSON.parse(response.data);
        const users = JSON.parse(response.data);
        // console.log(users)
        dispatch(
          fetchUserSuccess(
            users.data.token,
            users.data.user_email,
            users.data.user_name,
            users.data.user_id,
            users.data.profile_path, // added profile_path
          ),
        );
        console.log(
          fetchUserSuccess(
            users.data.token,
            users.data.user_email,
            users.data.user_name,
            users.data.user_id,
            users.data.profile_path,
          ),
        );
        saveAsync(
          users.data.token,
          users.data.user_id,
          users.data.user_name,
          users.data.user_email,
          users.data.profile_path, // saving profile_path
        );
      })
      .catch(error => {
        const errormsg = error.response?.data?.message || error.message;
        console.log(errormsg);
        dispatch(fetchUserFailure(errormsg));
        Alert.alert('Registration failed', errormsg);
      });
  };
};

const saveAsync = async (
  token,
  user_email,
  user_name,
  user_id,
  profile_path,
) => {
  try {
    // Storing token, user_email, user_name, user_id, and profile_path
    await SInfo.setItem(
      'data',
      JSON.stringify({
        token: token,
        user_id: user_id,
        user_name: user_name,
        user_email: user_email,
        profile_path: profile_path, // added profile_path
      }),
      {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      },
    );
    console.log('Data successfully saved');
  } catch (e) {
    console.log('Failed to save the data to the storage', e);
  }
};

// import axios from 'axios';
// import SInfo from 'react-native-sensitive-info';

// import {
//   FETCH_USER_FAILURE,
//   FETCH_USER_REQUEST,
//   FETCH_USER_SUCCESS,
//   LOGOUT
// } from '../type/authType';
// import { Alert, LogBox } from 'react-native';
// import RNFetchBlob from 'rn-fetch-blob';

// export const fetchUserRequest = () => {
//   return {
//     type: FETCH_USER_REQUEST,
//   };
// };

// export const fetchUserSuccess = (token,user_id,user_name,user_email,profile_path,) => {
//   console.log(token,user_id,user_name,user_email,profile_path,)
//   return {
//     type: FETCH_USER_SUCCESS,
//     payload: {token,user_name},
//   };
// };

// export const fetchUserFailure = error => {
//   return {
//     type: FETCH_USER_FAILURE,
//     payload: error,
//   };
// };

// export const logout = () =>{
//   return{
//     type:LOGOUT
//   }
// }

// export const login = (email, password) => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//     // console.log(email,password)
//     axios.post('http://10.0.2.2:8000/api/login', { email, password }).then((response)=>{
//         const users = response.data;
//         console.log(users)
//         dispatch(fetchUserSuccess(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email,users.data.profile_path));
//         saveAsync(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email,users.data.profile_path)
//     }).catch((error) => {
//         const errormsg = error.message;
//         console.log(errormsg)
//         dispatch(fetchUserFailure(errormsg));
//         Alert.alert('please fill all info currect')
//     });
//   };
// };

// export const register = (name, email, password, password_confirmation, image) => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());

//     const formData = [
//       { name: 'name', data: name },
//       { name: 'email', data: email },
//       { name: 'password', data: password },
//       { name: 'password_confirmation', data: password_confirmation },
//       {
//         name: 'profile_path',
//         filename: image.name || 'profile.jpg',
//         data: RNFetchBlob.wrap(image.replace('file://', '')),
//       },
//     ];

//     RNFetchBlob.fetch('POST', 'http://10.0.2.2:8000/api/register', {
//       'Content-Type': 'multipart/form-data',
//     }, formData)
//       .then((response) => {
//         const users = JSON.parse(response.data);
//         console.log(users)
//         dispatch(fetchUserSuccess(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email,users.data.profile_path));
//         saveAsync(users.data.token,users.data.user_id,users.data.user_name,users.data.user_email,users.data.profile_path);
//       })
//       .catch((error) => {
//         const errormsg = error.response?.data?.message || error.message;
//         console.log(errormsg);
//         dispatch(fetchUserFailure(errormsg));
//         Alert.alert('Registration failed', errormsg);
//       });
//   };
// };

// const saveAsync = async (token,user_id,user_name,user_email,profile_path,)=>{
// // console.log(token,user_name,email,user_id)
// try {
//   await SInfo.setItem('data', JSON.stringify({ token: token, user_id: user_id, user_name: user_name, user_email:user_email ,profile_path:profile_path }), {
//       sharedPreferencesName: 'mySharedPrefs',
//       keychainService: 'myKeychain'
//   });
//   console.log('Data successfully saved')
// } catch (e) {
//   console.log('Failed to save the data to the storage')
// }
// }
