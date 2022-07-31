const client = require('../bdPostgres/dataBase.js')


class MessagesController {
    async createMessage(req, res) {
        const {id, name, text, createdAt} = req.body

        const newMessage = await client.query(`INSERT INTO messages (id, name, text, createdAt)
        values ($1,$2,$3,$4) RETURNING *`, [id, name, text, createdAt])
        res.json(newMessage)
    }

    async getMessages(req, res) {
        const messages = await client.query('SELECT * FROM messages ORDER BY date')
        res.json(messages.rows)
    }

}

module.exports = MessagesController