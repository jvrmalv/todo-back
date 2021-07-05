import { DatabaseAdapter } from "src/adapters/database";
import { Todo } from "../entity/todos"

export default (databaseAdapter: DatabaseAdapter): Promise<Todo[]> => {
  return databaseAdapter.list(Todo);
}