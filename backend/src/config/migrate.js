const { getDb } = require('./db');

async function migrate() {
  const db = await getDb();
  
  console.log('Running migrations...');
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  console.log('Migrations completed.');
}

module.exports = { migrate };
