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

// TODO add config
const firebaseConfig = {};

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
