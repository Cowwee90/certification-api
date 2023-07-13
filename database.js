import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getStudents() {
    const [rows] = await pool.query("SELECT * FROM students")
    return rows
}

export async function getStudent(id) {
    const [row] = await pool.query(`
        SELECT *
        FROM students
        WHERE id = ?
    `, [id])
    return row[0]
}

export async function createStudent(name, level) {
    const [result] = await pool.query(`
        INSERT INTO students (name, level)
        VALUES (?, ?)
    `, [name, level])
    const id = result.insertId
    return getStudent(id)
}
