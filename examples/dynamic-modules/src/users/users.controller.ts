import { Connection, Repository } from 'typeorm';
import { Controller, Get, Inject } from '../../../../../core/src';
import { InjectConnection, InjectRepository } from '../../../../src';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
 
    @InjectConnection()
    private connection: Connection,

    @InjectRepository(UserEntity)
    private repository: any
  ) {
    // this.testConnection();
   }

  async testConnection() {
    if(await this.connection instanceof Connection)
      console.log('Database connected');

    console.log(this.repository);

    // const u = new UserEntity();
    // u.name = "test";
    // const  repo:Repository<UserEntity> = await this.repository(UserEntity);
    // // await repo.save(u);
    // const getUser = await repo.find({ id: 1})
    // console.log(getUser);
  }

  @Get()
  public async getUsers(req: any, res: any, next: any) {
    const data = this.usersService.find();
    res.status(200).json(data);
  }

  @Get('test')
  public async test(req: any, res: any, next: any) {
    this.testConnection();
    res.json({ message: 'success'});
    // res.status(200).json(data);
  }

}