// reducer 안에서 하는 일은 어떻게 state가 변하는 것을 보여준 다음에 변한 마지막 값을 return해주는게 reducer
// store에 여러 state를 관리하는 reducer들이 여러가지 있는 경우가 있음. ex) User Reducer, Post Reducer, Number Reducer...
// combineReducers는 이러한 여러 reducer들을 Root Reducer에서 하나로 합쳐주는 기능을 한다.

import { combineReducers } from 'redux'; 
//import user from './user_reducer';

const rootReducer = combineReducers({
    // user,
})

export default rootReducer;