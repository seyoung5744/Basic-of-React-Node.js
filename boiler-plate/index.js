const express = require('express') // express 모듈 가져오기
const app = express() // 해당 function을 이용해 새로운 express 앱을 만듦
const port = 5000 // 해당 port back server

const mongoose = require("mongoose")// mongo db 연결. mongoose는 ....
mongoose.connect("mongodb+srv://wonseyoung:won9975744!@boilerplate.7idhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))


app.get('/', (req, res) => { // root 디렉토리로 오면은 
  res.send('Hello World!') // Hello world 출력
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) // port 5000에서 이 앱을 실행
})

// package.json -> script -> "start":"node index.js" //  npm run start를 하면 해당 node 앱을 시작점으로 실행