import { useRecoilState } from "recoil";
import { playerAtom, PlayerState } from "../state/atoms/playerAtom";
import { TrackInterface } from "../state/types/track";

export function usePlayer(): [
  PlayerState,
  {
    play: () => void;
    pause: () => void;
    setVolume: (vol: number) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (dur: number) => void;
    setActiveTrack: (track: TrackInterface) => void;
  }
] {
  const [state, setState] = useRecoilState(playerAtom);

  const play = () => setState((s) => ({ ...s, pause: false }));
  const pause = () => setState((s) => ({ ...s, pause: true }));
  const setVolume = (vol: number) => setState((s) => ({ ...s, volume: vol }));
  const setCurrentTime = (time: number) =>
    setState((s) => ({ ...s, currentTime: time }));
  const setDuration = (dur: number) =>
    setState((s) => ({ ...s, duration: dur }));
  const setActiveTrack = (track: TrackInterface) =>
    setState((s) => ({
      ...s,
      active: track,
      duration: 0,
      currentTime: 0,
      pause: false, // Автоматически начинаем воспроизведение нового трека
    }));

  return [
    state,
    { play, pause, setVolume, setCurrentTime, setDuration, setActiveTrack },
  ];
}
