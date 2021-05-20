// User model

const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    email:{
        type: String,
        trim: true, // 문자열에 공백 포함되면 삭제해줌
        unique: 1 // email unique하게
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: { // user의 역할에 따른 구분을 위해, 관리자 혹은 일반 유저
        type: Number,
        default: 0 
    },
    image: String,
    token: { // 유효성 관리
        type: String
    },
    tokenExp: { // 토큰 사용 유효기간
        type: Number
    }
})

const User = mongoose.model("User", userSchema) // 스키마를 모델로 감싸준다.

module.exports = {User} // 다른 폴더에서도 해당 모델을 사용할 수 있도록 모듈화

