const db = require('../config/db').default

class UserController {
	async createUser(params) {
		try {
			const { name, email, password, phone, address } = params

			// Додаємо користувача в базу
			const [result] = await db.execute(
				'INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
				[name, email, password, phone, address]
			)

			const userId = result.insertId

			// Отримуємо створеного користувача
			const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [
				userId,
			])

			return rows[0] // ✅ Повертаємо об'єкт користувача
		} catch (error) {
			console.error('❌ Error creating user:', error)
			throw new Error('Database error')
		}
	}
}

module.exports = new UserController()
