import firebase from 'firebase/app';
import 'firebase/auth';
import { SETTINGS } from 'configs/settings';

if (!firebase.apps.length) {
  firebase.initializeApp(SETTINGS.FIREBASE_CONFIG);
}

export interface FirebaseUser extends firebase.User {}

export const auth = firebase.auth();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const phoneProvider = new firebase.auth.PhoneAuthProvider();

export function signInWithFacebookPopUp(): Promise<any> {
  return auth.signInWithPopup(facebookProvider);
}

export function login(email: string, password: string) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signOutOfFirebase(): Promise<void> {
  return auth.signOut();
}

export function resetPassword(email: string): Promise<any> {
  return auth.sendPasswordResetEmail(email);
}

export function signInWithPhoneNumber(
  phoneNumber: string,
  appVerifier: firebase.auth.ApplicationVerifier
): Promise<any> {
  return auth.signInWithPhoneNumber(phoneNumber, appVerifier);
}

export function getPhoneCredential(verificationId: string, verificationCode: string): Promise<any> {
  return Promise.resolve(firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode));
}

export async function getTokenFromFirebase(): Promise<string | null> {
  if (!auth.currentUser) {
    return null;
  }
  // https://firebase.google.com/docs/reference/js/firebase.User#getIdToken
  // Returns a JWT token used to identify the user to a Firebase service.
  // Returns the current token if it has not expired,
  // otherwise this will refresh the token and return a new one.
  return await auth.currentUser.getIdToken();
}
