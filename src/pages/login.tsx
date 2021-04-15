import React from "react";
import firebase from "firebase/app";
import { Link, useHistory } from "react-router-dom";
import { EmailForm, Button, emailKey, passwordKey } from "../components";
import routes from "../routes";
import styles from "./Pages.module.css";

const Login: React.FC = () => {
  const { push } = useHistory();
  const [error, setError] = React.useState<string | undefined>();

  const onSubmit = React.useCallback(
    (data: Record<string, string>) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(data[emailKey], data[passwordKey])
        .then(() => push(routes.root))
        .catch((err) => setError(err.message));
    },
    [push]
  );

  return (
    <div className={styles.authWrapper}>
      <EmailForm onSubmit={onSubmit} />
      <Link to={routes.register} className={styles.link}>
        Zaregistruj se
      </Link>
      <Button
        className={styles.googleButton}
        title="Přihlaš se pomocí Googlu"
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(() => push(routes.root))
            .catch((err) => setError(err.message));
        }}
      />
      <p>{error}</p>
    </div>
  );
};

export default Login;
