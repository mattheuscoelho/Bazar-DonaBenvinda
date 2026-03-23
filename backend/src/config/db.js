const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function getDb() {
  const dbFile = process.env.DATABASE_FILE || 'database.sqlite';
  return open({
    filename: path.resolve(__dirname, '../../', dbFile),
    driver: sqlite3.Database
  });
}

module.exports = { getDb };
