import express from 'express'

import { getStudents, getStudent, createStudent } from './database.js'

const app = express()

app.use(express.json())

app.get("/students", async (req, res) => {
    console.log("getting students")
    const students = await getStudents()
    res.send(students)
})

app.get("/students/:id", async (req, res) => {
    const id = req.params.id
    const student = await getStudent(id)
    res.send(student)
})

app.post("/students", async (req, res) => {
    const { name, level } = req.body
    const student = await createStudent(name, level)
    res.status(201).send(student)
})

app.use((err, req, res, next) => {
    console.log("error occured")
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log("Server is running on port 8080")
})