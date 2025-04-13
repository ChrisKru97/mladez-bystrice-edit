'use client';

import { useState, useEffect } from 'react';
import { Song } from '@/lib/types';

type SongFormProps = {
  initialSong: Omit<Song, 'id'>;
  onSubmit: (songData: Omit<Song, 'id'>) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText: string;
};

export function SongForm({ initialSong, onSubmit, isSubmitting, submitButtonText }: SongFormProps) {
  const [song, setSong] = useState<Omit<Song, 'id'>>(initialSong);

  // Update form when initialSong changes (useful for edit mode)
  useEffect(() => {
    setSong(initialSong);
  }, [initialSong]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'number') {
      setSong((prev) => ({ ...prev, [name]: value ? parseInt(value, 10) : undefined }));
    } else {
      setSong((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(song);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Song Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={song.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter song name"
            required
          />
        </div>

        <div>
          <label htmlFor="number" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Song Number
          </label>
          <input
            id="number"
            name="number"
            type="number"
            value={song.number || ''}
            onChange={handleChange}
            className="input w-full"
            placeholder="Enter song number (optional)"
          />
        </div>
      </div>

      <div>
        <label htmlFor="text" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Lyrics with Chords in [brackets]
        </label>
        <textarea
          id="text"
          name="text"
          value={song.text}
          onChange={handleChange}
          className="input min-h-[300px] w-full font-mono"
          placeholder="Enter lyrics with chords in [brackets], e.g. [G]Amazing [D]grace, how [C]sweet the [G]sound"
          required
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Place chords in [square brackets] before the syllable they belong to.
        </p>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? (
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
              Saving...
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}
