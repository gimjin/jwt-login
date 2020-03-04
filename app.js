var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var setCookie = require('set-cookie')
var jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// 密钥，不嫩给任何人看到
var key = 'shhhhh'

// 用户名密码验证后，向客户端发放token
app.get('/get-token', function (req, res) {
    res.json({
        result: 'ok',
        token: jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // Signing a token with 1 hour of expiration
          data: 'foobar'
        }, key)
    })
})

app.post('/login', function (req, res, next) {
  var decoded = jwt.verify(req.body.token, key)
  if (decoded.data === 'foobar') {
    setCookie('SESSION', '11111111111111111111', {
      res: res
    })
    res.json({msg: 'login success'})
  } else {
    res.json({msg: 'login fail'})
  }
})

app.use(express.static('.'))
app.listen(80, function () {
  console.log('API web server listening on port 80')
})
