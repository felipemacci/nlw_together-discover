const express = require('express')
const routes = express.Router()
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

routes.get('/', (req, res) => res.render('index', {page: 'home'}))
routes.get('/room/:room', RoomController.open)
routes.get('/create-room', (req, res) => res.render('index', {page: 'create-room'}))

routes.post('/question/create/:room', QuestionController.create)
routes.post('/question/:room/:question/:action', QuestionController.index)
routes.post('/create-room', RoomController.create)
routes.post('/home', RoomController.enter)

module.exports = routes