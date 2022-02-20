const express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const logout = require('./routes/logout')
const items = require('./routes/items')
const session = require('express-session')
const FileStore = require('session-file-store')(session)


const app = express()


app.use(express.static('public'))
app.use(express.json())
app.use(session({
  secret: 'some secret value',
  name: 'session',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({})
}))


app.use('/api/v1/items', items)
app.use('/api/v1/login', login)
app.use('/api/v1/logout', logout)
app.use('/api/v1/register', register)




app.listen(8080)