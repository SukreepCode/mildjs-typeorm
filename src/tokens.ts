import { Connection } from 'typeorm';
import { InjectionToken} from '../../core/src';

export const TypeOrmConnectionToken = new InjectionToken<Connection>('typeorm_connection');

export const TypeOrmRepositoryToken = new InjectionToken('typeorm_repository');
