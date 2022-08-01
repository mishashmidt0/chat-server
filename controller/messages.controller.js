const client = require('../bdPostgres/dataBase.js')


class MessagesController {
    async createMessage(req, res) {
        console.log(req.body)
        const {idKey, name, text, date} = req.body

        const newMessage = await client.query(`INSERT INTO messages ( name, text, date, idKey)
        values ($1,$2,$3,$4) RETURNING *`, [name, text, date,idKey])
        res.json(newMessage)
    }

    async getMessages(req, res) {
        const messages = await client.query('SELECT * FROM messages ORDER BY date')
        res.json(messages.rows)
    }

}

module.exports = MessagesController