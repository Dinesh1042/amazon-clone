import { Shipping } from './shipping';

export class User {
  displayName: string;
  email: string;
  photoURL: string | null;
  uid: string;
  username: string;
  isAdmin?: boolean;
  shoppingCartId: string;
  addressesMap: { [addressID: string]: Shipping } = {};

  constructor(user: UserInterface) {
    const { displayName, email, photoURL, uid, username, shoppingCartId } =
      user;

    this.displayName = displayName;
    this.email = email;
    this.photoURL = photoURL;
    this.uid = uid;
    this.username = username;
    this.shoppingCartId = shoppingCartId;

    this.isAdmin = user.isAdmin;
    this.addressesMap = user.addresses || {};
  }

  get addresses(): Shipping[] {
    return Object.entries(this.addressesMap).map(([addressID, value]) => ({
      ...value,
      addressID,
    }));
  }
}

export interface UserInterface {
  displayName: string;
  email: string;
  photoURL: string | null;
  uid: string;
  username: string;
  isAdmin?: boolean;
  shoppingCartId: string;
  addresses?: { [addressID: string]: Shipping };
}
