export class AppError extends Error {
    public readonly statusCode: number;

    constructor(errorMsg: string, statusCode: number) {
        super(errorMsg);
        this.statusCode = statusCode;
    }
}
