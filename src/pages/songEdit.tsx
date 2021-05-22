import React from "react";
import { useHistory, useParams } from "react-router";
import firebase from "firebase/app";
import { ContextState, SongContext } from "../storeProvider";
import { Song } from "../types";
import { handleFormData } from "../utils";
import styles from "./Pages.module.css";
import routes from "../routes";
import { Button, Loader, Input } from "../components";

const SongEdit: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const { push } = useHistory();
  const { data, refetch } = React.useContext<ContextState>(SongContext);

  const song: Song = React.useMemo(
    () => data?.[songId] ?? ({} as Song),
    [data, songId]
  );

  const onSubmit = React.useCallback(
    async (newData: Record<string, string>) => {
      await firebase
        .firestore()
        .doc(`songs/${songId}`)
        .update({ ...song, ...newData });
      refetch?.();
      push(routes.root);
    },
    [push, refetch, songId, song]
  );

  return (
    <form onSubmit={(e) => onSubmit(handleFormData(e))}>
      <div className={styles.wrapper}>
        {song ? (
          <div className={styles.songFormLayout}>
            <Input name="name" value={song.name} label="Název" />
            <Input
              name="withoutChords"
              value={song.withoutChords}
              label="Text"
              type="textarea"
            />
            <Input
              name="withChords"
              value={song.withChords}
              label="Verze s akordy"
              type="textarea"
            />
            <Button title="Ulož změny" type="submit" />
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};

export default SongEdit;
