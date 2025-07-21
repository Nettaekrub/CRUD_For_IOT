import Database from 'bun:sqlite';

const db = new Database('students.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    gender TEXT CHECK(gender IN ('ชาย', 'หญิง', 'อื่นๆ')),
    birth_date TEXT NOT NULL
  );
`);

export default db;
