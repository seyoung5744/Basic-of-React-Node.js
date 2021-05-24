import axios from 'axios';
import {LOGIN_USER} from './types';

export function loginUser(dataToSubmit) { // LoginPage let body 부분을 파라미터를 통해서 받는다.
    const request = axios
        .post("/api/users/login", dataToSubmit) 
        .then(response => response.data) // 서버에서 받은 데이터를 request에 저장);

    return { // reducer로 보낸다. 왜냐면 reducer에서 previousState와 action을 조합해서 nextState를 만들기 위해!!
        type: LOGIN_USER,
        payload: request
    }
}