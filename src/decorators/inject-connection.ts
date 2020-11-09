import { TypeOrmConnectionToken } from '../tokens';
import { makeInjectableParamsDecorator } from '../../../core/src';

export function InjectConnection(): Function {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        return makeInjectableParamsDecorator(TypeOrmConnectionToken, target, parameterIndex)
    };
}
