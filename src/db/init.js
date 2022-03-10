const config = require('./config')

const initDb = {
    async init() {
        const Database = await config()

        await Database.exec(`
            CREATE TABLE rooms (
                id INTEGER PRIMARY KEY,
                pass TEXT
            )
        `)

        await Database.exec(`
            CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                read INTEGER,
                room INTEGER
            )
        `)

        await Database.close()
    }
}

initDb.init()