import { Document } from 'mongoose';

export class User extends Document {
    readonly username: string;
    readonly email: string;
    readonly dateCreated: Date;
    readonly password?: string;
}
