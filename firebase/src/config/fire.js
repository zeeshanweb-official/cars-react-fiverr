import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAIvqLuN7gyDLiTPsS81SbcsipIrfpdjnk",
    authDomain: "sokogar-fe589.firebaseapp.com",
    databaseURL: "https://sokogar-fe589.firebaseio.com",
    projectId: "sokogar-fe589",
    storageBucket: "sokogar-fe589.appspot.com",
    messagingSenderId: "20832143161",
    appId: "1:20832143161:web:bbed9270069181c2c80ae8",
    measurementId: "G-L0YVND8QZZ"
  };
  const fire = firebase.initializeApp(firebaseConfig)
  export default fire;