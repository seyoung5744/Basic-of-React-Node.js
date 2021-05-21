// User model

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // salt를 10자리로 만들겠다.
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 문자열에 공백 포함되면 삭제해줌
    unique: 1, // email unique하게
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    // user의 역할에 따른 구분을 위해, 관리자 혹은 일반 유저
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    // 유효성 관리
    type: String,
  },
  tokenExp: {
    // 토큰 사용 유효기간
    type: Number,
  },
});

// user model에 user 정보를 저장하기 전에 사전 작업. next 인자를 만들고 function 작업이 끝나면 index.js의 save로 전달해준다.
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    // 비밀번호를 변경할 때만 암호화
    // 비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // salt 생성,  생성된 salt를 이용해서 비밀번호를 암호화
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        // plain 패스워드를 가져온다.
        // Store hash in your password DB.
        if (err) return next(err);
        user.password = hash; // 암호화가 성공하면 비번을 hash된 비번으로 바꿔서 보내준다.
        next();
      });
    });
  } else {
    // 비밀 번호를 바꾸는게 아니라 다른 부분 수정할 때는 그냥 next()가 필요함. 안그러면 위의 if 문 코드에 머뭄.
    next();
  }
});

// custom method
userSchema.methods.comparePassword = function (plainPassword, callback) {
  // 이곳 method명과 index.js method 명은 같아야함.

  // plainPassword 1234567   암호화된 비밀번호 $2b$10$ODMJ.RYOtI4ZK8H01HCnBOJt8KuinXLkD2cUZOherRqznHExGDUc2 이 두개가 같은지 체크
  // 이미 암호화된 비번을 복호화 할순 없다.
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// custom method
userSchema.methods.generateToken = function (callback) {
  var user = this;

  // 3. 비밀번호까지 맞으면 토큰을 생성하기.
  var token = jwt.sign(user._id.toHexString(), "secretToken"); // db에 있는 _id

  /*
    user._id + 'secretToken' 로 token 생성
    나중에 'secretToken' 을 이용해서 user._id를 얻어옴
    */

  // 위에서 만든 token을 스키마에 넣어주고 save
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });

  // 그리고 여기서 저장된 user 정보가 index.js의 user 로 감
};

// custom method use auth.js
userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // generateToken methokd에서 만든 user._id + 'secretToken'의 '' 부분을 인자로 줘서 decode
  // 가져온 token decode.
  jwt.verify(token, "secretToken", function (err, decode) {
    // 유저 아이디를 이용해서 유저를 찾은 다음에
    // client에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

    user.findOne({"_id": decode, "token": token }, function (err, user) { // mongo db에 있는 findOne
      if(err) return callback(err);
      callback(null, user)
    });
  });
};

const User = mongoose.model("User", userSchema); // 스키마를 모델로 감싸준다.

module.exports = { User }; // 다른 폴더에서도 해당 모델을 사용할 수 있도록 모듈화
