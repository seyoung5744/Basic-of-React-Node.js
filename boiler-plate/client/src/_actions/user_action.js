import axios from 'axios';
import {LOGIN_USER, REGISTER_USER, AUTH_USER} from './types';

//! -------------------------------------------------------------------------------------------------------------------------------------
//! LoginUser
export function loginUser(dataToSubmit) { // LoginPage let body 부분을 파라미터를 통해서 받는다.
    const request = axios
        .post("/api/users/login", dataToSubmit) 
        .then(response => response.data) // 서버에서 받은 데이터를 request에 저장);

    return { // reducer로 보낸다. 왜냐면 reducer에서 previousState와 action을 조합해서 nextState를 만들기 위해!!
        type: LOGIN_USER,
        payload: request
    }
}

//! -------------------------------------------------------------------------------------------------------------------------------------
//! RegisterUser
export function registerUser(dataToSubmit) { // LoginPage let body 부분을 파라미터를 통해서 받는다.
    const request = axios
        .post("/api/users/register", dataToSubmit) 
        .then(response => response.data) // 서버에서 받은 데이터를 request에 저장);

    return { // reducer로 보낸다. 왜냐면 reducer에서 previousState와 action을 조합해서 nextState를 만들기 위해!!
        type: REGISTER_USER,
        payload: request
    }
}

//! -------------------------------------------------------------------------------------------------------------------------------------
//! auth
export function auth() { 
    const request = axios   // server의 auth 미들웨어가 쿠키 안에 저장된 토큰을 해당 사람이 로그인한 유저인지 아닌지 파단을 해서 react로 정보를 재 전송해준다.
        .get("/api/users/auth") // get method이기 때문에 body 부분은 필요가 없음.
        .then(response => response.data) // 서버에서 받은 데이터를 request에 저장);

    return { // reducer로 보낸다. 왜냐면 reducer에서 previousState와 action을 조합해서 nextState를 만들기 위해!!
        type: AUTH_USER,
        payload: request
    }
}