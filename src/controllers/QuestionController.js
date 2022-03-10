const Config = require('../db/config')

module.exports = {
    async index(req, res) {
        const Database = await Config()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        const verifyRoom = await Database.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

        if(verifyRoom.pass == password) {
            if(action == 'delete') {
                await Database.run(`DELETE FROM questions WHERE id = ${questionId}`)
            } else if(action == 'check') {
                await Database.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('passincorrect', { roomId })
        }

        await Database.close()

        
    },

    async create(req, res) {
        const Database = await Config()
        const question = req.body.question
        const roomId = req.params.room

        await Database.run(`
            INSERT INTO questions (
                content,
                room,
                read
            ) VALUES (
                "${question}",
                ${roomId},
                0
            )
        `)

        await Database.close()

        res.redirect(`/room/${roomId}`)
    }
}