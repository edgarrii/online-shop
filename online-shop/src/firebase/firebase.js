import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-1lflMAF3LMikIXN00AXMYWXifVd3L3k",
  authDomain: "online-shop-ed-store.firebaseapp.com",
  projectId: "online-shop-ed-store",
  storageBucket: "online-shop-ed-store.appspot.com",
  messagingSenderId: "672006369704",
  appId: "1:672006369704:web:36290a6d8a1a402694ed9d",
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
  }

  createAccount = (email, password) => this.auth.createUser(email, password);
  signIn = (email, password) => this.auth.signInUser(email, password);
  signInWithGoogle = () =>
    this.auth.signUserWithGoogle(new app.auth.GoogleAuthProvider());
  signOut = () => this.auth.signOut();
}
