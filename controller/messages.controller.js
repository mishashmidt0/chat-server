const pool = require('../bdPostgres/dataBase.js')


class MessagesController {
    async createMessage(req, res) {
        const {id, from, text, createdAt} = req.body

        const newMessage = await pool.query(`INSERT INTO messages (id, from, text, createdAt)
        values ($1,$2,$3,$4) RETURNING *`, [id, from, text, createdAt])
        res.json(newMessage)
    }

    async getMessages(req, res) {
        const messages = await pool.query('SELECT * FROM messages ORDER BY date')
        res.json(messages.rows)
    }

}

module.exports = MessagesController