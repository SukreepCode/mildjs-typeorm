import { Constructor, getClassName } from "@mildjs/core";
import { Entity } from "typeorm";

export const TypeOrmConnectionToken = "typeorm_connection";

export function getTypeOrmRepositoryToken(entity: Constructor<any>) {
  return `typeorm_repository_${getClassName(entity)}`;
}
