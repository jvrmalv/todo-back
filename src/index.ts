import { Connection, createConnection } from "typeorm";
import express from "express"
import cors from "cors"
import todoController from "./controller/todoController"
import "reflect-metadata"
import bodyParser from "body-parser";
const app = express()

createConnection().then(
  (connection: Connection) => {
    app.use(cors())
    app.use(express.json())

    const port = 3000
    const todoRouter = todoController(connection)

    app.use("/todo", todoRouter)

    app.listen(port, async () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }
)

