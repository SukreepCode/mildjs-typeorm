import { Connection, Repository } from 'typeorm';
import { Controller } from '@mildjs/core';
import { InjectConnection, InjectRepository } from '../../../../src';
import { UserEntity } from './users.entity';

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
    const newUser = new UserEntity();
    newUser.name = "foobar";
    const user: UserEntity = await this.repository.save(newUser);
    console.log(user);
  }

}