import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAp0GmWslA7E4E_kH3k9ewJxUoSbJzjEJI",
  authDomain: "imessage-clone-1e1ef.firebaseapp.com",
  databaseURL: "https://imessage-clone-1e1ef.firebaseio.com",
  projectId: "imessage-clone-1e1ef",
  storageBucket: "imessage-clone-1e1ef.appspot.com",
  messagingSenderId: "93785198261",
  appId: "1:93785198261:web:f1671fbe13694754ae78fc",
  measurementId: "G-FJXPQF4RY8",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
