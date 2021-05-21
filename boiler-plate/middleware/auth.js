const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리 하는 곳
  // 1. client cookie에서 token을 가져온다.
  let token = req.cookie.x_auth;

  // 2. token을 복호화한 후 서버에서 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;

    // 4. 유저가 없으면 인증 No !
    if (!user) return res.json({ isAuth: false, error: true });


     // 3. 유저가 있으면 인증 Okay
    // req에 token, user 정보를 넣어준 이유는 index.js -> app.get('/api/users/auth', auth, (req, res)...의 req에서 받아서 쓰라고...
    req.token = token;
    req.user = user;

    next(); // next 하는 이유는 미들웨어해서 다음 단계로 넘어가도록 하기위해서 설정. next가 없으면 미들웨어에 갇혀있게 된다. index.js의 app.get('/api/users/auth', auth, (req, res)=>

    // next까지 정상적으로 통과를 했으면 미들웨어를 통과 했다는 의미
  });
};

module.exports = { auth };
