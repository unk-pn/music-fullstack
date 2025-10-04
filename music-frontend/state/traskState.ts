import { atom } from 'recoil';
import { TrackInterface } from './types/track';

export const trackListState = atom<TrackInterface[]>({
  key: 'trackListState',
  default: [],
});

export const trackErrorState = atom<string | null>({
  key: 'trackErrorState',
  default: null,
});