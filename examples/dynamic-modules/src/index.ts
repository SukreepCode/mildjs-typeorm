import 'reflect-metadata';
import express, { Response } from 'express';
import { useExpressServer, Controller, Get, Injectable, Module, InjectionToken } from '../../../../core/src';
import { TypeOrmModule, InjectConnection } from '../../../src';
import { UsersModule } from './users/users.module';

const app = express();

useExpressServer(app, {
    imports: [
        UsersModule,
        TypeOrmModule.forRoot({
            name: 'default',
            type: 'sqlite',
            database: './app.sqlite',
            synchronize: true,
            entities: ['**/*.entity.ts'],
        })
    ],
});

app.listen(3001);
console.log("server listening at port 3001")