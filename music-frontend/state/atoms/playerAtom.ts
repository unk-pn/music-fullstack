import { atom, selector } from 'recoil';
import { TrackInterface } from '../types/track';

export interface PlayerState {
  currentTime: number;
  duration: number;
  pause: boolean;
  active: TrackInterface | null;
  volume: number;
}

export const playerAtom = atom<PlayerState>({
  key: `playerAtom_${Math.random()}`,
  default: {
    currentTime: 0,
    duration: 0,
    pause: true,
    active: null,
    volume: 50,
  },
});

export const isPlayingSelector = selector<boolean>({
  key: `isPlayingSelector_${Math.random()}`,
  get: ({ get }) => !get(playerAtom).pause,
});