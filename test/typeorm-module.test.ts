import { Controller, Get, Module, useExpressServer } from '@mildjs/core';
import express, { Response } from "express";
import request from 'supertest';
import { Connection } from 'typeorm';
import { TypeOrmModule, InjectConnection } from '../src';

@Controller()
class MockController {

    constructor(
        @InjectConnection()
        public connection: Connection
    ) { }

    @Get()
    index(req: any, res: Response) {
        if(this.isConnection()){
            res.status(200).send('connected');
        }
        res.status(400).send('ERROR');
    }

    async isConnection(){
        return await this.connection instanceof Connection
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
                    entities: ['**/*.entity.ts'],
                })
            ]
        });

        app.listen();
    });

    it('/ [get]', () => {
        request(app)
            .get('/')
            .expect(200)
            .expect('connected')
    });

});
