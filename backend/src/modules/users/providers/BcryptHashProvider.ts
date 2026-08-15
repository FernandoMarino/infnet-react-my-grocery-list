import { IHashProvider } from "./IHashProvider.js";
import bcrypt from "bcrypt";

export class BcryptHashProvider extends IHashProvider {
    async generateHash(payload: string) {
        return bcrypt.hash(payload, 10);
    }

    async compareHash(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);
    }
}
