import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2pfMPk0jbytNqodDzXH5Wa-kQNn5wjJ4",
  authDomain: "geo-attendance-791a1.firebaseapp.com",
  projectId: "geo-attendance-791a1",
  storageBucket: "geo-attendance-791a1.firebasestorage.app",
  messagingSenderId: "420135955628",
  appId: "1:420135955628:web:800b3c010e1efdf14f8309",
  measurementId: "G-X4DH7FKSVW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Configure auth persistence for better UX
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Error setting auth persistence:', error);
});

// Debug logging (remove in production)
if (import.meta.env.DEV) {
  console.log('Firebase Config:', firebaseConfig);
  console.log('Auth initialized:', auth);
  console.log('Firestore initialized:', db);
}

export { auth, db };
