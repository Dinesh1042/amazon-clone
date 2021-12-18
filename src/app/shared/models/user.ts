export interface User {
  displayName: string;
  email: string;
  photoURL: string | null;
  uid: string;
  username: string;
  isAdmin?: boolean;
  shoppingCartId: string;
}
