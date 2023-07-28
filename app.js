// express import
const express = require('express');
// express에 정의된 app 겍체 생성
const app = express();

const PORT = 1702;// 클라이언트의 요청을 대기할 포 설정
app.listen(PORT,function(){
    console.log('listening on port: ',PORT);
})

// tạo đường dẫn đến router
//라우트 객체 생성
const dustRouter    = require('./router/dust');

// tạo router
//라우트 설정
//app.use('/', mainrouter);
//app.use('/', newsrouter);
//app.use('/', stockrouter);


//라우트 설정
app.use('/dust', dustRouter);

app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');


// kết nối database với server
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//라우트 객체 생성
const mainRouter    = require('./router/index');
//const dustRouter    = require('./router/dust');
const userRouter    = require('./router/user');

//라우트 설정
app.use('/', mainRouter);
//app.use('/dust', dustRouter);
app.use('/user', userRouter);


// tạo login
const passport          = require('passport');
const passportConfig    = require('./passport');
const session           = require('express-session');
const flash             = require('connect-flash');

passportConfig()

//세션 설정
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: "sessionsecretsessionsecret",
    }),
);
//passport 초기화
app.use(passport.initialize()); //req에 passport 설정 추가
app.use(passport.session());    //req.session에 passport 데이터 추가
app.use(flash());

//thêm new
const newsRouter    = require('./router/news');

app.use('/news', newsRouter);

// thêm wifi
const wifiRouter    = require('./router/wifi');
app.use('/wifi', wifiRouter);

//tạo mask
const maskRouter    = require('./router/mask');
app.use('/mask', maskRouter);

// tạo âm thanh
app.use(express.static(__dirname + '/public'));

//kết nối với tensorflow
const tfjsRouter    = require('./router/tfjs');
app.use('/tfjs', tfjsRouter);