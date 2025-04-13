'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { collection, query, orderBy, getDocs, DocumentData } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { db, auth } from './firebase';
import { Song } from './types';

type StoreContextType = {
  songs: Song[];
  songsById: Record<string, Song>;
  loading: boolean;
  error: string | null;
  maxNumber: number;
  refetch: () => Promise<void>;
  getSongById: (id: string) => Song | undefined;
  getSongByNumber: (number: number) => Song | undefined;
};

const StoreContext = createContext<StoreContextType>({
  songs: [],
  songsById: {},
  loading: false,
  error: null,
  maxNumber: 0,
  refetch: async () => {},
  getSongById: () => undefined,
  getSongByNumber: () => undefined,
});

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [songsById, setSongsById] = useState<Record<string, Song>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const refetch = useCallback(async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get all songs ordered by number
      const orderedQuery = query(
        collection(db, 'songs'),
        orderBy('number')
      );

      const orderedSnapshot = await getDocs(orderedQuery);

      // Process the results
      const songsMap = new Map<string, Song>();

      // Process ordered songs
      orderedSnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        songsMap.set(doc.id, { id: doc.id, ...data } as Song);
      });

      // Convert to array and record
      const songsList = Array.from(songsMap.values());
      const songsRecord: Record<string, Song> = {};

      songsList.forEach((song) => {
        if (song.id) {
          songsRecord[song.id] = song;
        }
      });

      setSongs(songsList);
      setSongsById(songsRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      if (!user) {
        router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (user && songs.length === 0 && !loading && !error) {
      refetch();
    }
  }, [user, songs.length, loading, error, refetch]);

  const maxNumber = useMemo(() => {
    if (songs.length === 0) return 0;

    // Find the highest number
    let highest = 0;
    for (const song of songs) {
      if (song.number && song.number > highest) {
        highest = song.number;
      }
    }

    return highest;
  }, [songs]);

  const getSongById = useCallback(
    (id: string) => songsById[id],
    [songsById]
  );

  const getSongByNumber = useCallback(
    (number: number) => songs.find((song) => song.number === number),
    [songs]
  );

  const value = {
    songs,
    songsById,
    loading,
    error,
    maxNumber,
    refetch,
    getSongById,
    getSongByNumber,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
