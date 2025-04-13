'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useStore } from '@/lib/store-provider';
import { SongForm } from '@/components/songs/song-form';
import { Song } from '@/lib/types';
import {t} from "@/lib/translations";

export default  function EditSongPage({ id }: { id: string }) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const { getSongById, refetch } = useStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [song, setSong] = useState<Song | null>(null);

    // Fetch song data
    useEffect(() => {
        if (id) {
            const songData = getSongById(id);
            if (songData) {
                setSong(songData);
            } else {
                setError(t('Song not found'));
            }
        }
    }, [id, getSongById]);

    // Redirect if not logged in
    if (!loading && !user) {
        router.push('/login');
        return null;
    }

    const handleSubmit = async (songData: Omit<Song, 'id'>) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Update the song in Firestore
            await updateDoc(doc(db, 'songs', id), songData);

            // Refetch songs to update the list
            await refetch();

            // Redirect to the song list
            router.push('/');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred while updating the song. Please try again.'
            );
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this song? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            // Delete the song from Firestore
            await deleteDoc(doc(db, 'songs', id));

            // Refetch songs to update the list
            await refetch();

            // Redirect to the song list
            router.push('/');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'An error occurred while deleting the song. Please try again.'
            );
            setIsDeleting(false);
        }
    };

    if (loading || !song) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
            </div>
        );
    }

    // Remove the id from the song for the form
    const { id: _, ...songWithoutId } = song;

    return (
        <div className="container mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Edit Song</h1>
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="btn bg-red-600 text-white hover:bg-red-700"
                >
                    {isDeleting ? (
                        <span className="flex items-center justify-center">
              <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Deleting...
            </span>
                    ) : (
                        'Delete Song'
                    )}
                </button>
            </div>

            {error && (
                <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
                    {error}
                </div>
            )}

            <SongForm
                initialSong={songWithoutId}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitButtonText={t("Update Song")}
            />
        </div>
    );
}
