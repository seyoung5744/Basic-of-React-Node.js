import Axios from 'axios';
import React, {useEffect} from 'react';
import {useDispatch, useDitpatch} from 'react-redux';
import {auth} from '../_actions/user_action'

//! Auth Compoenent
export default function (SpecificComponent, option, adminRoute = null) {

    /*
    option
    - null      ==> 아무나 출입이 가능한 페이지
    - true      ==> 로그인한 유저만 출입이 가능한 페이지
    - false     ==> 로그인한 유저는 출입 불가능한 페이지
    */

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        // 1. backend에 request를 날려서 해당 사람의 현재 상태를 가져온다.
        useEffect(() => {

            dispatch(auth()).then(
                response => { // 페이지가 이동할 떄마다 dispatch가 작동을 해서 계속 backend에 request를 주고 reponse를 받는다.
                    console.log(response)

                    // 로그인 하지 않은 상태
                    if (!response.payload.isAuth) {
                        if (option) { // option이 true인 페이지로 들어가려고 하면
                            props.history.push('/login')
                        }
                    } else {
                        // 로그인한 상태
                        if (adminRoute && !response.payload.isAuth) { // 관리자지만 로그인한 상태가 아닐때
                            props.history.push('/')
                        } else {
                            if (option === false) 
                                props.history.push('/')
                            }
                    }
                }
            )

        }, [])

        return (<SpecificComponent/>)
    }

    return AuthenticationCheck
}