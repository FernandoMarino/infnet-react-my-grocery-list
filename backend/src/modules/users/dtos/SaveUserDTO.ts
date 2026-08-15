export interface SaveUserDTO {
    name: string;
    email: string;
    passwordHash?: string | null;
    googleUuid?: string | null;
}