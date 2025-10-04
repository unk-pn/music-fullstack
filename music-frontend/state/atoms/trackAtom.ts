import { atom } from 'recoil';
import { TrackInterface } from '../types/track';

interface TrackState {
  tracks: TrackInterface[];
  error: string;
}

export const trackAtom = atom<TrackState>({
  key: `trackAtom_${Math.random()}`,
  default: {
    tracks: [],
    error: '',
  },
});
