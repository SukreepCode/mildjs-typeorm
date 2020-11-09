import "reflect-metadata";
import { ConnectionOptions, Connection, createConnection, Entity } from 'typeorm';
import { InjectionToken, Provider, DynamicModule, Module, GlobalStore} from '../../core/src';
import { TypeOrmConnectionToken, TypeOrmRepositoryToken } from './tokens';
// export const TypeOrmConnectionToken = new InjectionToken<Connection>('typeorm_connection');

@Module({})
export class TypeOrmModule {

  static forRoot(config: ConnectionOptions): DynamicModule {

    const connection = createConnection(config);

    const typeOrmConnection = {
      provide: TypeOrmConnectionToken,
      useValue: connection,
    };

    const TypeOrmRepository = {
      provide: TypeOrmRepositoryToken,
      useValue: 'do not use value'
    }

    TypeOrmModule.setConnection(connection);

    return {
      module: TypeOrmModule,
      providers: [typeOrmConnection, TypeOrmRepository]
    }
  }

  static setConnection(connection: any){
    GlobalStore.set('typeorm_connection', connection);
    console.log(GlobalStore.get('typeorm_connection'));
  }

}