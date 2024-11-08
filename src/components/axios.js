
import axios from "axios"
import { ip } from "./IpAddress";



const token = (token) => {

    const instance = axios.create({
        baseURL: `${ip}/api/`,
        timeout: 10000,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return instance
}

// const instance = axios.create({
//     baseURL: 'http://15.207.110.135/api/v1/lo',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${store.getState().Auth.token}`
//     }
// });

export default token