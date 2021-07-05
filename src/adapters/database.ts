import { Connection, createConnection, InsertResult, UpdateResult } from "typeorm";
export type DatabaseAdapter = {
  create<U, T = unknown>(entity: new () => T, params: U): Promise<T>,
  read<T = unknown>(entity: new () => T, id: string): Promise<T | undefined>,
  list<T = unknown>(entity: new () => T): Promise<T[]>,
  update<U, T = unknown>(entity: new () => T, id: string, payload: U): Promise<T>,
  remove<T = unknown>(entity: new () => T, id: string): Promise<unknown>
}
export default (connection: Connection): DatabaseAdapter => {
  return {
    create: <U, T = unknown>(entity: new () => T, params: U): Promise<T> => {
      return connection.manager
        .insert(entity, params)
        .then((insertResult: InsertResult) => insertResult.generatedMaps[0] as T);
    },
    read: (entity, id) => {
      return connection.manager.findOne(entity, id)
    },
    list: (entity) => {
      return connection.manager.find(entity);
    },
    update: <U, T = unknown>(entity: new () => T, id: string, payload: U): Promise<T> => {
      return connection.manager
        .update(entity, id, payload)
        .then((updateResult: UpdateResult) => updateResult.generatedMaps[0] as T);
    },
    remove: (entity, id) => {
      return connection.manager.delete(entity, id);
    }
  };
}
