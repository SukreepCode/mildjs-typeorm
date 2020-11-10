import 'reflect-metadata';
import express from 'express';
import { useExpressServer } from '@mildjs/core';
import { TypeOrmModule } from '../../../src';
import { UsersController } from './users/users.controller';
import { UserEntity } from './users/users.entity';

const app = express();

async function main() {
    await useExpressServer(app, {
        controllers: [UsersController],
        imports: [
            TypeOrmModule.forRoot({
                name: 'default',
                type: 'sqlite',
                database: './app.sqlite',
                synchronize: true,
                entities: [UserEntity],
            })
        ],
    });
}

main();
app.listen(3001);
console.log("server listening at port 3001")