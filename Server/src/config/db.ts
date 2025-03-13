import { createPool, Pool } from 'mysql2/promise'

const db: Pool = createPool({
	host: 'localhost',
	user: 'root',
	password: 'your_password', // змініть на свій пароль
	database: 'project',
	charset: 'utf8mb4',
})

// Функція для перевірки підключення
async function checkConnection() {
	try {
		const connection = await db.getConnection()
		console.log('✅ Підключено до MariaDB')
		connection.release() // Важливо закрити з'єднання після перевірки
	} catch (error) {
		console.error('❌ Помилка підключення до MariaDB:', error)
		process.exit(1)
	}
}

// Викликаємо перевірку при старті сервера
checkConnection()

export default db
