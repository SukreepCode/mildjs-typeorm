import { Constructor, getClassName, Inject } from "@mildjs/core";
import { getTypeOrmRepositoryToken } from "../tokens";

export function InjectRepository(entity: Constructor<any>): Function {
  return Inject(getRepositoryToken(entity));
}

function getRepositoryToken(entity: any) {
  return getTypeOrmRepositoryToken(entity);
}
