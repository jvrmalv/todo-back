import { Connection, createConnection } from "typeorm";
export default (connection: Connection) => {
  return {
    create: <T>(entity: T) => {
      return connection.manager.save(entity);
    },
    read: <T>(entity: new () => T, id: string) => {
      return connection.manager.findOne(entity, id)
    },
    list: <T>(entity: new () => T,) => {
      return connection.manager.find(entity);
    },
    update: <T>(entity: T) => {
      return connection.manager.save(entity);
    },
    remove: <T>(entity: T) => {
      return connection.manager.save(entity);
    }
  };
}