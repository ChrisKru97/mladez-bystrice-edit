import React from "react";
import { useHistory } from "react-router-dom";
import { List, ListRowProps } from "react-virtualized";
import { ContextState, SongContext } from "../storeProvider";
import routes from "../routes";
import { Loader } from "../components";
import styles from "./Pages.module.css";

const SongList: React.FC = () => {
  const { orderedList, refetch } = React.useContext<ContextState>(SongContext);
  const { push } = useHistory();

  React.useEffect(() => {
    if (!orderedList?.length) {
      refetch?.();
    }
  }, [orderedList, refetch]);

  const rowRenderer = React.useCallback(
    ({ index, style }: ListRowProps): React.ReactElement => {
      if (!orderedList) return <div />;
      const song = orderedList[index];
      return (
        <div className={styles.songButtonWrapper} key={index} style={style}>
          <div
            className={styles.songButton}
            onClick={() => push(routes.song(song.id))}
            aria-hidden="true"
          >
            {song.number ? `${song.number}. ` : ""}
            {song.name}
          </div>
        </div>
      );
    },
    [orderedList, push]
  );

  return (
    <div className={styles.wrapper}>
      {orderedList ? (
        <List
          className={styles.mystyle}
          height={window.innerHeight}
          rowCount={orderedList.length}
          rowHeight={80}
          rowRenderer={rowRenderer}
          width={window.innerWidth}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SongList;
