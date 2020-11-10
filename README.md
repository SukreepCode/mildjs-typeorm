# TypeORM module (extension) for @mildjs/core

[![Build Status](https://travis-ci.org/mildjs/typeorm.svg?branch=main)](https://travis-ci.org/mildjs/typeorm)
[![codecov](https://codecov.io/gh/mildjs/typeorm/branch/main/graph/badge.svg?token=tk4rLlUNBP)](https://codecov.io/gh/mildjs/typeorm)
[![npm version](https://badge.fury.io/js/%40mildjs%2Ftypeorm.svg)](https://badge.fury.io/js/%40mildjs%2Ftypeorm)


## Features

- Auto load Entity 
- Support TypeOrm connection using `@InjectConnection`
- Support TypeOrm repository using `@InjectRepository`

## Installation

```
$ npm install @mildjs/typeom typeorm 
```

### Usage

1. Define user entity

    ```typescript
    // filename: user.entity.ts
    import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

    @Entity()
    export class UserEntity {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        name: string;

    }
    ```

2. define controller

    ```typescript
    // filename: user.controller.ts
    import { Connection, Repository } from 'typeorm';
    import { Controller } from '@mildjs/core';
    import { InjectConnection, InjectRepository } from '@mildjs/typeorm';
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
    ```

3. Setup `@mildjs/core` with express 

    ```typescript
    // filename:  main.ts
    import 'reflect-metadata';
    import express from 'express';
    import { useExpressServer } from '@mildjs/core';
    import { TypeOrmModule } from '@mildjs/typeorm';
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
    ```

Run

```
ts-node ./main.ts
```

The result should be (the ID is auto generated )

```bash
server listening at port 3001
Database connected
UserEntity { name: 'foobar', id: 1 }
```