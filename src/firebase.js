import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDAfGpMixw9-5sx21SMdq-l4IbVZ2S96WU",
  authDomain: "saav-9c29f.firebaseapp.com",
  projectId: "saav-9c29f",
  storageBucket: "saav-9c29f.appspot.com",
  messagingSenderId: "179713043489",
  appId: "1:179713043489:web:3cd54ce6cf472d4a4d4760",
  measurementId: "G-1KHBDMTST5",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
