const e = require('express');
const express = require('express') // express 모듈 가져오기
const app = express() // 해당 function을 이용해 새로운 express 앱을 만듦
const port = 5000 // 해당 port back server


const mysql = require('mysql')

var connection = mysql.createConnection({
    host : "223.194.46.212",
    port : 3306,
    user : "root", //mysql의 id
    password : "12345!", //mysql의 password
    database : "aistudydb", //사용할 데이터베이스
});

connection.connect(function(err){
    if(err){
      console.error('error connecting'+err.stack);
      return;
    }else{
        console.log("MariaDB Connected...")
    }
    connection.end();
  })

app.get('/', (req, res) => { // root 디렉토리로 오면은 
  res.send('Hello World!') // Hello world 출력
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`) // port 5000에서 이 앱을 실행
})

// package.json -> script -> "start":"node index.js" //  npm run start를 하면 해당 node 앱을 시작점으로 실행