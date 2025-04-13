'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useStore } from '@/lib/store-provider';
import { SongList } from '@/components/songs/song-list';
import {t} from "@/lib/translations";

export default function HomePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { songs, refetch } = useStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && songs.length === 0) {
      refetch();
    }
  }, [user, songs.length, refetch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">{t("Song List")}</h1>
      <SongList />
    </div>
  );
}
