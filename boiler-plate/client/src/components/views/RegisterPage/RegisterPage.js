import React, {useState} from "react";
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';


function RegisterPage(props) {
    const dispatch = useDispatch();

    // 1 . value 부분 state 넣기 rendor 부분의 데이터 변화를 하기 위해서는 state 변화를 시켜서 적용
    const [Email, setEmail] = useState(""); // setEmail을 통해 state 변경 가능.
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    // 2. State 설정만으로는 form에 타이핑이 안된다. 그리고 타이핑을 할때 이 state를 바꿔주면 및에 코드의 value가 바뀐다.
    // 타이핑을 할때 onChange라는 이벤트를 발생시켜서 state을 바꿔주고 해당 state이 바뀌면 value가 바뀐다.
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value); // setEmail을 통해 state 변경 가능.
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); // 버튼 클릭했을 시 리플레시가 되는 것을 방지. 안그러면 작업 진행이 안됨.
        // console.log('Email',Email) console.log('Password',Password)

        if(Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }
        let body = {
            email: Email,
            password: Password,
            name: Name
        };

        dispatch(registerUser(body)).then(response => { // dispatch를 이용해 action을 날리기
            if(response.payload.success) {
                props.history.push("/login")
            }else {
                alert("Failed to sign up")
            }
        })
        // Axios.post("/api/user/login", body).then((respose) => {});  원래 해당 부분은 _action
        // 에서 하는 작업

    }; // 서버에 보내고자 하는 값들을 state가 갖고 있는다.

    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
        }}>
        <form
            style={{
                display: "flex",
                flexDirection: "column"
            }}
            onSubmit={onSubmitHandler}>

            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/>

            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>

            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>

            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">회원가입</button>
        </form>
    </div>
    )
}

export default withRouter(RegisterPage)
