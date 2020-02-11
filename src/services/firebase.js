import firebase from "firebase";
import "firebase/functions";

import api from "./api";

firebase.initializeApp({
  apiKey: "AIzaSyB1iY7OhbJGKPoCE7X1N_eQlOpGhJGG6AI",
  projectId: "which-ev-for-me",
  appId: "1:939952615843:web:5b654bca763da58b396a16"
});

if (!api.isProd())
  firebase.functions().useFunctionsEmulator("http://localhost:5000");

export default firebase;
