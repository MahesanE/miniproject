export class Vape {
    type!: string;
    flavor!: string;
    quantity!: number;
    price!: number;
}

export interface User {
    uid: string; // The user ID from Google Auth
    displayName: string;
    phoneNumber: string;
    address: string;
  }
  