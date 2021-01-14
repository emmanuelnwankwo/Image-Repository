import { Document } from 'mongoose';

export class Image extends Document {
    readonly name: string;
    readonly url: string;
    readonly format: string;
    readonly public: boolean;
    readonly amount: number;
    readonly discount: boolean;
    readonly discountAmount: number;
    readonly available: boolean;
    readonly userId: string;
    readonly purchaseBy?: string;
    readonly dateCreated: Date;
    readonly dateUpdated?: Date;
}
