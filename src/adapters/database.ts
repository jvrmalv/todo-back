import { Connection, createConnection, InsertResult } from "typeorm";
export type DatabaseAdapter = {
  create<U, T = unknown>(entity: new () => T, params: U): Promise<T>,
  read<T = unknown>(entity: new () => T, id: string): Promise<T | undefined>,
  list<T = unknown>(entity: new () => T): Promise<T[]>,
  update<T = unknown>(entity: T): Promise<T>,
  remove<T = unknown>(entity: T): Promise<T>
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
    update: (entity) => {
      return connection.manager.save(entity);
    },
    remove: (entity) => {
      return connection.manager.remove(entity);
    }
  };
}