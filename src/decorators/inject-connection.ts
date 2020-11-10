import { Inject } from "@mildjs/core";
import { TypeOrmConnectionToken } from "../tokens";

export function InjectConnection(): Function {
  return Inject(TypeOrmConnectionToken);
}
