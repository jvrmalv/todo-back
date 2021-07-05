import { DatabaseAdapter } from "src/adapters/database";
import { Todo } from "../entity/todos"

export default (databaseAdapter: DatabaseAdapter, params: string): Promise<Todo | undefined> => {
  return databaseAdapter.read(Todo, params)
}