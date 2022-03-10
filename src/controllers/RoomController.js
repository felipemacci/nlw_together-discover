const Config = require('../db/config')

module.exports = {
    async create(req, res) {
        const Database = await Config()

        const pass = req.body.password

        let roomId

        let isRoom = true

        while(isRoom) {
            for(var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            }
    
            const roomsExistIds = await Database.all(`SELECT id FROM rooms`)
    
            isRoom = roomsExistIds.some(roomExistId => roomExistId === roomId)

            if(!isRoom) {
                await Database.run(`
                INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${Number(roomId)},
                    "${pass}"
                )
            `)
            }
        }

        await Database.close()

        res.redirect(`/room/${roomId}`)
    },

    async open(req, res) {
        const Database = await Config()
        const roomId = req.params.room
        const questions = await Database.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        const questionsRead = await Database.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isQuestions = false

        if(questions.length == 0 && questionsRead.length == 0) {
            isQuestions = false
        } else {
            isQuestions = true
        }

        res.render('room', { roomId, questions, questionsRead, isQuestions })
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}