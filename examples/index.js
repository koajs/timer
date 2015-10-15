/**
 * Module Dependencies
 */

var timer = require('..')({ slow: '3s' })
var Koa = require('koa')
var app = new Koa()

/**
 * Middleware
 */

app.use(timer(function * find_user (next) {
  yield wait(250)
  yield next
  yield wait(2000)
}))

app.use(timer(function * find_company (next) {
  yield wait(1000)
  yield next
  yield wait(1000)
}))

app.use(timer(function * pull_financials (next) {
  yield wait(500)
  yield next
  yield wait(500)
}))

app.use(timer(function * render () {
  yield wait(250)
  this.body = 'hola'
  yield wait (1000)
}))

/**
 * Listen
 */

app.listen(5000, function () {
  var addr = this.address()
  console.log('listening to [%s]:%s', addr.address, addr.port)
})

/**
 * Wait
 */

function wait (ms) {
  return function (done) {
    setTimeout(done, ms)
  }
}
