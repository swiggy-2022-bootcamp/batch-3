export class CustomError extends Error {
    statusCode: number;

    constructor(m: string, code: number) {
        super(m);
        this.statusCode = code;
    }
};
