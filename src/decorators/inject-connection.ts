import { makeInjectableParamsDecorator } from '@mildjs/core';

export function InjectConnection(): Function {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        return makeInjectableParamsDecorator('TypeOrmConnectionToken', target, parameterIndex)
    };
}
