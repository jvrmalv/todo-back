import { DatabaseAdapter } from "../adapters/database";
import { Todo } from "../entity/todos";

export default (databaseAdapter: DatabaseAdapter, params: string): Promise<unknown> => {
  return databaseAdapter.remove(Todo, params);
}