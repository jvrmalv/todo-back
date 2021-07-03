import { Connection, createConnection } from "typeorm";
import express from "express"
import cors from "cors"
import todoController from "./controller/todoController"
import "reflect-metadata"
import { Todo } from "./entity/todos"
const app = express()



app.use(cors())

const port = 3000

app.use("/todo", todoController)

app.listen(port, async () => {
    const connection = await createConnection();

    console.log(`Example app listening at http://localhost:${port}`)
})