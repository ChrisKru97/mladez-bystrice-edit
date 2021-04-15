import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { EmailForm, emailKey, passwordKey } from "../components";
import routes from "../routes";
import styles from "./Pages.module.css";

const Register: React.FC = () => {
  const [error, setError] = React.useState<string | undefined>();
  const [info, setInfo] = React.useState<string | undefined>();

  const onSubmit = React.useCallback((data: Record<string, string>) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data[emailKey], data[passwordKey])
      .then(() => setInfo("Úspěšně registrován!\nPožádej o aktivaci účtu"))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className={styles.authWrapper}>
      <EmailForm onSubmit={onSubmit} />
      {info}
      {(info || error) && <Link to={routes.root}>Zpět</Link>}
      {error}
    </div>
  );
};

export default Register;
