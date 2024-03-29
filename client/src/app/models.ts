export class Vape {
    type!: string;
    flavor!: string;
    quantity!: number;
    price!: number;
    selectedQuantity!: number | null;
}


export interface User {
    uid: string; // The user ID from Google Auth
    displayName: string;
    email: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    unitNumber: string;
    comments: string;
}
