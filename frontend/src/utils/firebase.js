// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);

// const googleProvider = new GoogleAuthProvider();

// const facebookProvider = new FacebookAuthProvider();
// facebookProvider.addScope('email');

// export async function googleAuth() {
//   try {
//     const data = await signInWithPopup(auth, googleProvider);
//     console.log("Google user:", data.user);
//     return data.user;
//   } catch (error) {
//     console.error("Google Auth Error:", error);
//     throw error;
//   }
// }

// export async function facebookAuth() {
//   try {
//     const data = await signInWithPopup(auth, facebookProvider);
//     console.log("Facebook user:", data.user);
//     return data.user;
//   } catch (error) {
//     console.error("Facebook Auth Error:", error);
//     throw error;
//   }
// }

// export async function signOutUser() {
//   try {
//     await signOut(auth);
//     console.log("User signed out");
//   } catch (error) {
//     console.error("Sign Out Error:", error);
//   }
// }

