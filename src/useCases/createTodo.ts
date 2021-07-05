import { DatabaseAdapter } from "src/adapters/database";
import { Todo } from "../entity/todos"

export type CreateParams = {
  name: string,
  description?: string,
}

export default (databaseAdapter: DatabaseAdapter, params: CreateParams): Promise<Todo> => {
  return databaseAdapter.create<CreateParams, Todo>(Todo, params);
}