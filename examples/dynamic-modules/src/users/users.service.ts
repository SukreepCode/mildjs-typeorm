import { useExpressServer, Controller, Get, Injectable, Module, InjectionToken } from '../../../../../core';
import { TypeOrmModule, InjectConnection, InjectRepository } from '../../../../src';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    // constructor(
    //     @InjectRepository(UserEntity)
    //     private repository: Repository<UserEntity>
    // ) { }

    public find() {
        return { name: 'Data from service (using injectable)' };
    }
}