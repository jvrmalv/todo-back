import { DatabaseAdapter } from "../adapters/database";
import { Todo } from "../entity/todos"

type Payload = {
  name?: string,
  description?: string
}

export type UpdateParams = Payload & {
  id: string,
}

export default (databaseAdapter: DatabaseAdapter, params: UpdateParams): Promise<Todo> => {
  const { id, ...payload } = params;
  return databaseAdapter.update<Payload, Todo>(Todo, id, payload);
}