import { Elysia } from "elysia";
import db from "./database"

const app = new Elysia().get("/", () => "Hello Bro").listen(3000);

app.get('/students', () => {
  const all_std = db.prepare('SELECT * FROM students');
  return all_std.all()
})

app.get('/student/:student_id', ({params}) => {
  const student =  db.prepare('SELECT * FROM students WHERE student_id = ?').get(params.student_id);
  return student;
})

app.post('/add-student', ({body}) => {
  const {student_id,first_name, last_name, gender,birth_date } = body;
  const student = db.prepare(`
    INSERT INTO students (student_id, first_name, last_name, gender, birth_date)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = student.run(student_id, first_name, last_name, gender, birth_date);
  return { id: info.lastInsertRowid };
})

app.put('/student/:student_id', ({params, body})=> {
  const { student_id, first_name, last_name, gender, birth_date } = body;
  const student = db.prepare(`
      UPDATE students SET
      student_id = ?, first_name = ?, last_name = ?, gender = ?, birth_date = ?
      WHERE student_id = ?
    `);
  student.run(student_id, first_name, last_name, gender, birth_date, params.student_id);
  return {updated: true};
});

app.delete('/student/:student_id', ({params}) => {
  const student = db.prepare('DELETE FROM students WHERE id = ?');
  student.run(params.student_id);
  return { deleted: true };
})

app.listen(3000);
console.log('🦊 ElysiaJS_LNW Running at http://localhost:3000, เฮลโหลเทสๆ');