import express, { Router, Request, Response } from "express";
import updateTodo, { UpdateParams as TodoUpdateParams } from "../useCases/updateTodo";
import createTodo, { CreateParams as TodoCreateParams } from "../useCases/createTodo"
import getTodo from "../useCases/getTodo";
import { Connection } from "typeorm";
import databaseAdapterConstructor from "../adapters/database";
import listTodos from "../useCases/listTodos";
import removeTodo from "../useCases/removeTodo";

export default (connection: Connection): Router => {
  const router: Router = express.Router()
  const databaseAdapter = databaseAdapterConstructor(connection)

  router.get("/", (req: Request, res: Response) => {
    listTodos(databaseAdapter).then((todo) => {
      res.json(todo)
    })
  })

  router.get("/:id", (req: Request, res: Response) => {
    getTodo(databaseAdapter, req.params.id).then((todo) => {
      res.json(todo)
    })
  })

  router.post("/", async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const params: TodoCreateParams = { name, description };
    createTodo(databaseAdapter, req.body).then((todo) => {
      res.json(todo)
    })

  })

  router.delete("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    removeTodo(databaseAdapter, id).then(() => {
      res.status(204).end()
    })
  })

  router.put("/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body;
    const params: TodoUpdateParams = { id, name, description }
    updateTodo(databaseAdapter, params).then(async (todo) => {
      res.json(await getTodo(databaseAdapter, id))
    })

  })
  return router
}