export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash?: string | null;
    googleUuid?:string | null;
    createdAt: Date;
    updatedAt: Date;
}