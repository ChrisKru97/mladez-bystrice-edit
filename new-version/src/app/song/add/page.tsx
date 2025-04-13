'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useStore } from '@/lib/store-provider';
import { SongForm } from '@/components/songs/song-form';
import { Song } from '@/lib/types';

export default function AddSongPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const { maxNumber, refetch } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not logged in
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (songData: Omit<Song, 'id'>) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Add the song to Firestore
      await addDoc(collection(db, 'songs'), songData);
      
      // Refetch songs to update the list
      await refetch();
      
      // Redirect to the song list
      router.push('/');
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while adding the song. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  // Initial song data with the next available number
  const initialSong: Omit<Song, 'id'> = {
    name: '',
    number: maxNumber + 1,
    checkRequired: true,
    withChords: '',
    withoutChords: '',
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">Add New Song</h1>
      
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
          {error}
        </div>
      )}

      <SongForm 
        initialSong={initialSong}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Add Song"
      />
    </div>
  );
}
