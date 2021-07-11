import  firebase from "firebase";
require("@firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDEkwQTD8uel0tY6ucFIUDoknf9IqY5G38",
  authDomain: "wily-50926.firebaseapp.com",
  projectId: "wily-50926",
  storageBucket: "wily-50926.appspot.com",
  messagingSenderId: "698433600105",
  appId: "1:698433600105:web:463eaafe117e03eb2a40f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
