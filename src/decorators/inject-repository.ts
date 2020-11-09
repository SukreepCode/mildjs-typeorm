import { makeInjectableParamsDecorator, isConstructor, Constructor, GlobalStore } from '@mildjs/core';
import { Entity, Repository, MongoRepository, TreeRepository } from 'typeorm';

export function InjectRepository(entity: Constructor<any>): Function {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {

        console.log(GlobalStore.get('typeorm_connection'));

        const value = () => "hey function";
        return makeInjectableParamsDecorator('TypeOrmRepositoryToken', target, parameterIndex, value);
    };
}


function getRepositoryToken(){

}

function getRepository(repositoryType: Function, entityType: Function) {


    // const connection = connectionManager.get(connectionName);


    // switch (repositoryType) {
    //     case Repository:
    //         return connection.getRepository(entityType);
    //     case MongoRepository:
    //         return connection.getMongoRepository(entityType);
    //     case TreeRepository:
    //         return connection.getTreeRepository(entityType);
    //     // if not the TypeORM's ones, there must be custom repository classes
    //     default:
    //         return connection.getCustomRepository(repositoryType);
    // }
}