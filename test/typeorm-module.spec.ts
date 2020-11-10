import { Controller, Get, Module, useExpressServer } from '@mildjs/core';
import express, { Response } from "express";
import request from 'supertest';
import { Connection, Repository } from 'typeorm';
import { TypeOrmModule, InjectConnection, InjectRepository } from '../src';
import { UserEntity} from './users.entity';

@Controller()
class MockController {

    constructor(
        @InjectConnection()
        public connection: Connection,


        @InjectRepository(UserEntity)
        public repository: Repository<UserEntity>,
    ) { }

    @Get('connection')
    get_connection(req: any, res: Response) {
        if(this.connection){
            res.status(200).send('connected');
        }
        res.status(400).send('ERROR');
    }

    @Get('repository')
    async get_repo(req: any, res: Response) {
        if(this.repository instanceof Repository){
            await this.repository.save(new UserEntity());
            res.status(200).send('Saved User');
        }
        res.status(400).send('ERROR');
    }
}

describe('Run controller only mode : GET (e2e)', () => {

    let app: express.Application;
    beforeAll(async () => {
        app = express();
        useExpressServer(app, {
            controllers: [MockController],
            imports: [
                TypeOrmModule.forRoot({
                    name: 'default',
                    type: 'sqlite',
                    database: './app.sqlite',
                    synchronize: true,
                    entities: [UserEntity],
                })
            ]
        });

        app.listen();
    });

    it('/connection [get]', () => {
        request(app)
            .get('/connection')
            .expect(200)
            .expect('connected')
    });

    it('/repository [get]', () => {
        request(app)
            .get('/repository')
            .expect(200)
            .expect('Saved User')
    });

});
