import React from "react";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import { Input, Button } from "../components";
import { ContextState, SongContext } from "../storeProvider";
import { handleFormData } from "../utils";
import styles from "./Pages.module.css";
import routes from "../routes";

const SongAdd: React.FC = () => {
  const { push } = useHistory();
  const { refetch } = React.useContext<ContextState>(SongContext);

  const onSubmit = React.useCallback(
    async (data: Record<string, string>) => {
      await firebase
        .firestore()
        .collection("songs")
        .add({ ...data, checkRequired: true });
      refetch?.();
      push(routes.root);
    },
    [push, refetch]
  );

  return (
    <form onSubmit={(e) => onSubmit(handleFormData(e))}>
      <div className={styles.wrapper}>
        <div className={styles.songFormLayout}>
          <Input name="name" label="Název" />
          <Input name="withoutChords" label="Text" type="textarea" />
          <Input name="withChords" label="Verze s akordy" type="textarea" />
          <Button title="Přidej píseň" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default SongAdd;
