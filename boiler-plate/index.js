const express = require("express"); // express 모듈 가져오기
const app = express(); // 해당 function을 이용해 새로운 express 앱을 만듦
const port = 5000; // 해당 port back server

const bodyParser = require("body-parser"); // 클라이언트 정보를 서버에서 분석해서 가져올 수 있게 해주는 것
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

const config = require("./config/key");

const jwt = require("jsonwebtoken");

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// bodyParser 옵션 설정
// For Express version less than 4.16.0

// application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));

// application.json
// app.use(bodyParser.json())

// Express v4.16.0 and higher
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.use(cookieParser());

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const mongoose = require("mongoose"); // mongo db 연결. mongoose는 ....
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  // root 디렉토리로 오면은
  res.send("Hello World!~안녕하세요ㅋㅋㅋㅋㅋㅋㅋ"); // Hello world 출력
});

// 회원 가입을 위한 router
app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 DB에 넣어준다.

  // 1. User 인스턴스 생성
  // 2. 클라이언트에 있는 정보들을 db에 넣어주기 위한 작업 req.body
  // req.body 안에는 json 형식으로 { id : "hello" pwd:"111"} 이런식으로 데이터가 들어있다. 그리고 이 req.body안에 데이터가 들어 있을 수 있게 해주는 것이 body-parser
  const user = new User(req.body);

  // .save() : mongo db에서 온 메소드
  // req.body에 있는 정보들이 user model에 저장됨
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); // 저장을 할 떄 err가 있으면 클라이언트에 err를 json형식으로 전달.
    return res.status(200).json({
      // status(200) 성공했다는 의미
      success: true,
    });
  }); // postman을 이용해서 회원가입 test
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// login router 만들기
app.post("/login", (req, res) => {
  // 1. 요청된 이메일을 DB에서 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    // 찾고자 하는 이메일 넣는다 email: req.body.email, 이메일을 가진 유저가 한명도 없으면 user 변수가 없는 것
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 2. 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 3. 비밀번호까지 맞아면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err); // 400으로 client에게 err가 있다는 것을 알려주고 err메시지는 send

        // 토큰을 저장한다 어디에? 쿠키, 로컬스토리지, 세션 (F12에서 확인가능.)
        // 어디가 안전한지는 논쟁이 많으나 여기서는 쿠키에 저장. express에서 제공되는 cookie-parser 이용
        res
          .cookie("x_auth", user.token)
          .status(200) // 성공했다는 표시
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`); // port 5000에서 이 앱을 실행
});

// package.json -> script -> "start":"node index.js" //  npm run start를 하면 해당 node 앱을 시작점으로 실행
