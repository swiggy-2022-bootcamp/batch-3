/// <reference types="express" />

/**
 * This type definition augments existing definition
 * from @types/express-flash
 */
declare namespace Express {
    export interface Request {
        flash(event: string, message: any): any;
        userId?: string;
        _userId?: string;
    }
}

interface Flash {
    flash(type: string, message: any): void;
}

declare module "express-flash";

