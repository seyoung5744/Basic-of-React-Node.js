import { LOGIN_USER, REGISTER_USER } from '../_actions/types';

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
            

        default:
            return state;
    }



}