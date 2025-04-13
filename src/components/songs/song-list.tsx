'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store-provider';
import { t } from '@/lib/translations';

export function SongList() {
  const { songs, loading, error } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (song.number?.toString() || '').includes(searchTerm)
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-100 p-4 text-red-700">
        <p>Error loading songs: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            className="input w-full pl-10"
            placeholder={t("Search songs by name or number...")}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {filteredSongs.length === 0 ? (
        <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
          <p className="text-gray-600 dark:text-gray-300">
            {songs.length === 0 ? 'No songs found. Add your first song!' : 'No songs match your search.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSongs.map((song) => (
            <Link
              key={song.id}
              href={`/song/edit?id=${song.id}`}
              className="card group flex flex-col transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {song.name}
                </h2>
              </div>
              {song.number && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Number: {song.number}
                </div>
              )}
              <div className="mt-4 flex-grow">
                <div className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  {song.text.replace(/\[.*?\]/g, '').substring(0, 150)}...
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
