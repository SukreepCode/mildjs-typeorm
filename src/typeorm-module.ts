import "reflect-metadata";
import {
  ConnectionOptions,
  Connection,
  createConnection,
  Entity,
} from "typeorm";
import {
  Provider,
  DynamicModule,
  Module,
  GlobalStore,
  isConstructor,
  getClassName,
} from "@mildjs/core";
import { TypeOrmConnectionToken, getTypeOrmRepositoryToken } from "./tokens";

@Module({})
export class TypeOrmModule {
  static forRoot(config: ConnectionOptions): DynamicModule {
    const connection = createConnection(config);
    const repositoryProviders: Provider[] = getRepositoryProviders(
      connection,
      config.entities
    );
    return {
      module: TypeOrmModule,
      providers: [getConnectionProvider(connection), ...repositoryProviders],
    };
  }
}

function getConnectionProvider(connection: any) {
  return {
    provide: TypeOrmConnectionToken,
    useAsyncFactory: connection,
  };
}

function getRepositoryProviders(connection: any, entities: any[] = []) {
  // Auto load entity
  const entitiesClass: any[] = [];

  entities.forEach((entity: any) => {
    if (isConstructor(entity)) {
      entitiesClass.push(entity);
    }
  });

  const getRepository = async (entity: any) => {
    return await (await connection).getRepository(entity);
  };

  const exportProviders: Provider[] = [];

  entitiesClass.forEach((entity: any) => {
    exportProviders.push({
      provide: getTypeOrmRepositoryToken(entity),
      useAsyncFactory: getRepository(entity),
    });
  });

  return exportProviders;
}
