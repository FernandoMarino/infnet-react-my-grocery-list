export interface CreateUserDTO {
    name: string;
    email: string;
    password?: string;
    googleUuid?: string
}