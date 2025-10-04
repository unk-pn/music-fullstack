import { useState } from 'react';
import { TrackInterface } from '../state/types/track';
import { BACKEND_URL } from '../backends';

export const useFetchTracks = () => {
  const [tracks, setTracks] = useState<TrackInterface[]>([]);
  const [error, setError] = useState<string>('');

  const fetchTracks = async (query = '') => {
    try {
      const response = await fetch (`${BACKEND_URL}/tracks/search?query=${query}`)
      const data = await response.json()
      setTracks(data);
      setError('');
    } catch (error) {
      const e = error as Error
      setError('Ошибка при загрузке треков: ' + e.message);
    }
  };

  return {
    tracks,
    error,
    fetchTracks
  };
};
