import React from "react";
import firebase from "firebase/app";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import routes from "./routes";
import { Register, SongEdit, SongAdd, SongList, Login } from "./pages";
import StoreProvider from "./storeProvider";
import { Menu } from "./components";

const firebaseConfig = {
  apiKey: "AIzaSyAc1KVAC0t0hevhkDSmnFpS3WDFIDTP5FA",
  authDomain: "mladezovy-zpevnik.firebaseapp.com",
  databaseURL: "https://mladezovy-zpevnik.firebaseio.com",
  projectId: "mladezovy-zpevnik",
  storageBucket: "mladezovy-zpevnik.appspot.com",
  messagingSenderId: "207934052135",
  appId: "1:207934052135:web:4934c11d305f30970f7b02",
};

const App: React.FC = () => {
  return (
    <Router>
      <StoreProvider>
        <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
          <Switch>
            <Route path={routes.login}>
              <Login />
            </Route>
            <Route path={routes.register}>
              <Register />
            </Route>
            <Route path={routes.addSong}>
              <SongAdd />
            </Route>
            <Route path={routes.song()}>
              <SongEdit />
            </Route>
            <Route path={routes.root}>
              <SongList />
            </Route>
          </Switch>
          <Menu />
        </FirebaseAuthProvider>
      </StoreProvider>
    </Router>
  );
};

export default App;
