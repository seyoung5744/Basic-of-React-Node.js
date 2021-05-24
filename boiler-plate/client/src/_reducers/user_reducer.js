import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function(state = {}, action) {
    switch(action.type){ // 각각의 type에 따른 조치.
        case LOGIN_USER:
                return {...state, loginSuccess: action.payload} 
                // ...(spread operater) : 위의 빈 state를 그 상태 그대로 가져오는 것
                // user_action의 payload를 loginSuccess에 넣어줌.
                break;
        
        case REGISTER_USER:
                return {...state, register: action.payload }
                break;
            
        case AUTH_USER:
                return {...state, userData: action.payload } // node server의 index.js에서 유저 정보들을 action.payload 부분에 받아오기 때문에 userData라고 명시
                break;
        default:
            return state;
    }



}