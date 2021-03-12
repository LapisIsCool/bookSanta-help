import * as firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCVOtfqHbee6TV5R9fUlhiRW6rVi2rSmM4",
  authDomain: "booksanta-f4ed4.firebaseapp.com",
  projectId: "booksanta-f4ed4",
  storageBucket: "booksanta-f4ed4.appspot.com",
  messagingSenderId: "1008345206698",
  appId: "1:1008345206698:web:c43784b80798c58fc325d3",
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
