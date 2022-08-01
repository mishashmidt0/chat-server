const client = require('../bdPostgres/dataBase.js')


class MessagesController {
    async createMessage(req) {
        try {
            const {idKey, name, text, date} = req.body

            const response = await client.query(`INSERT INTO messages2 ( idKey,name, text, date )
            values ($1,$2,$3,$4) RETURNING *`, [idKey, name, text, date])

            return response.rows
        } catch (e) {
            console.log(e)
        }

    }

    async getMessages(req, res) {
        try {
            const messages2 = await client.query('SELECT * FROM messages2 ORDER BY date')
            res.json(messages2.rows)
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = MessagesController