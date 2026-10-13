// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase only if we have the required config
let app: FirebaseApp | undefined;
let auth: Auth | undefined;

try {
  // Only initialize if we have the API key (required for initialization)
  if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } else {
    console.warn('Firebase configuration incomplete, Firebase will not be fully initialized');
  }
} catch (error) {
  console.warn('Firebase initialization failed:', error);
}

// If app/auth are not initialized, create mock objects for build time
// This prevents build failures when Firebase config is missing
if (!app || !auth) {
  // Create a minimal mock for Auth type
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: async () => { 
      throw new Error('Firebase not configured'); 
    },
    signInWithPopup: async () => { 
      throw new Error('Firebase not configured'); 
    },
    signInWithRedirect: async () => { 
      throw new Error('Firebase not configured'); 
    },
    signOut: async () => {},
    onIdTokenChanged: () => () => {},
  } as unknown as Auth;
  
  // Create a minimal mock for FirebaseApp
  app = {} as unknown as FirebaseApp;
}

// Initialize Analytics (only on client-side, lazy loaded)
let analytics: any = null;

if (typeof window !== 'undefined') {
  // Lazy load analytics only in browser
  (async () => {
    try {
      const { getAnalytics } = await import("firebase/analytics");
      if (app) {
        analytics = getAnalytics(app);
      }
    } catch (e) {
      console.warn('Analytics initialization failed:', e);
    }
  })();
}

export { app, auth, analytics };