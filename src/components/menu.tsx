import React, { useContext } from "react";
import firebase from "firebase/app";
import { Route, Switch, useHistory } from "react-router";
import routes from "../routes";
import { ContextState, SongContext } from "../storeProvider";
import styles from "./Components.module.css";
import MenuButton from "./menuButton";

const Menu: React.FC = () => {
  const listenerFunction = React.useRef<() => void>();
  const { push } = useHistory();
  const [show, setShow] = React.useState<boolean>(false);
  const { maxNumber, getId, data, refetch } = useContext<ContextState>(
    SongContext
  );

  const addToSongs = React.useCallback(
    async (songId: string) => {
      await firebase
        .app()
        .functions("europe-west3")
        .httpsCallable("addToSongs")({
        songId,
      });
      refetch?.();
      push(routes.root);
    },
    [push, refetch]
  );

  const onKeyPress = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        const id = getId?.(parseInt((e.target as HTMLInputElement).value, 10));
        if (id) {
          push(routes.song(id));
        }
      }
    },
    [push, getId]
  );

  const stopPropagationAndHide = React.useCallback(
    (fn?: () => void, dontHide?: boolean) => (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!dontHide) {
        setShow(false);
      }
      fn?.();
    },
    []
  );

  React.useEffect(() => {
    listenerFunction.current = () => setShow(false);
    document.addEventListener("click", listenerFunction.current);
    return () => {
      if (listenerFunction.current) {
        document.removeEventListener("click", listenerFunction.current);
      }
    };
  }, []);

  return (
    <>
      <div className={styles.menuContainer} style={{ opacity: show ? 1 : 0 }}>
        <Switch>
          <Route path={routes.register}>
            <MenuButton
              title="Zpět"
              onClick={stopPropagationAndHide(() => push(routes.login))}
            />
          </Route>
          <Route path={routes.login} />
          <Route
            path={routes.song()}
            render={({
              match: {
                params: { songId },
              },
            }) => {
              const showAddSong = !!(
                songId &&
                songId !== "add" &&
                data?.[songId].checkRequired
              );
              return (
                <>
                  {showAddSong && (
                    <MenuButton
                      title="Přidej do zpěvníku"
                      onClick={stopPropagationAndHide(() => addToSongs(songId))}
                    />
                  )}
                  <MenuButton
                    title="Zpět"
                    onClick={stopPropagationAndHide(() => push(routes.root))}
                  />
                </>
              );
            }}
          />
          <Route path={routes.root}>
            <input
              placeholder="Číslo písně..."
              onClick={stopPropagationAndHide(undefined, true)}
              className={styles.menuButton}
              onKeyPress={onKeyPress}
              type="number"
              min={1}
              max={maxNumber}
            />
            <MenuButton
              title="Přidej píseň"
              onClick={stopPropagationAndHide(() => push(routes.addSong))}
            />
            <MenuButton
              title="Odhlásit"
              onClick={stopPropagationAndHide(() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => push(routes.login))
              )}
            />
          </Route>
        </Switch>
      </div>
      <div
        className={styles.menuIcon}
        onClick={stopPropagationAndHide(() => setShow(!show), true)}
        aria-hidden="true"
      >
        &#9776;
      </div>
    </>
  );
};

export default Menu;
