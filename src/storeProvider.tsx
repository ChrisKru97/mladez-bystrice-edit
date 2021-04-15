import React from "react";
import firebase from "firebase/app";
import { useHistory } from "react-router";
import { Song } from "./types";

export type ContextState = {
  getId?: (number: number) => string;
  maxNumber?: number;
  orderedList?: Song[] | undefined;
  data?: Record<string, Song>;
  refetch?: () => Promise<void>;
};

export const SongContext = React.createContext<ContextState>({});

const StoreProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { push } = useHistory();
  const [orderedList, setOrderedList] = React.useState<Song[]>();
  const [data, setData] = React.useState<Record<string, Song>>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const refetch = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await Promise.all([
        firebase
          .firestore()
          .collection("songs")
          .where("checkRequired", "==", true)
          .get(),
        firebase.firestore().collection("songs").orderBy("number").get(),
      ]);
      const resList = res[0].docs.concat(res[1].docs);
      const list = Array.from<Song>({ length: resList.length });
      const newData: Record<string, Song> = {};
      resList.forEach((song, i) => {
        const songData = song.data();
        list[i] = { id: song.id, ...songData } as Song;
        newData[song.id] = songData as Song;
      });
      setOrderedList(list);
      setData(newData);
    } catch (err) {
      setError(err.message);
      if (!firebase.auth().currentUser) push("/login");
    } finally {
      setLoading(false);
    }
  }, [push]);

  React.useEffect(() => {
    if (!data && !loading && !error) {
      refetch();
    }
  }, [refetch, data, loading, error]);

  const maxNumber = React.useMemo<number>(() => {
    if (!orderedList) return 1;
    for (let i = orderedList.length - 1; i >= 0; i -= 1) {
      if (orderedList[i].number) {
        return orderedList[i].number as number;
      }
    }
    return 1;
  }, [orderedList]);

  const getId = React.useCallback(
    (number: number): string =>
      orderedList?.find((s) => s.number === number)?.id ?? "",
    [orderedList]
  );

  return (
    <SongContext.Provider
      value={{ data, orderedList, refetch, getId, maxNumber }}
    >
      {children}
    </SongContext.Provider>
  );
};

export default StoreProvider;
