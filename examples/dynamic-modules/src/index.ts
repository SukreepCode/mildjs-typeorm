import 'reflect-metadata';
import express, { Response } from 'express';
import { useExpressServer, Controller, Get, Injectable, Module } from '@mildjs/core';
import { TypeOrmModule, InjectConnection } from '../../../src';
import { UsersModule } from './users/users.module';
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