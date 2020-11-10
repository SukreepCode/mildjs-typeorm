import { Connection, Repository } from 'typeorm';
import { Controller, Get, Inject } from '@mildjs/core';
import { InjectConnection, InjectRepository } from '../../../../src';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(

    @InjectConnection()
    private connection: Connection,

    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
    
  ) {
    this.testConnection();
  }

  async testConnection() {
    if(this.connection instanceof Connection){
      console.log('Database connected')
    }
    const getUser = await this.repository.find({ id: 1})
    console.log(getUser);
  }

}