import { useRecoilState } from 'recoil';
import { trackAtom } from '../state/atoms/trackAtom';
import { TrackInterface } from '../state/types/track';
import { BACKEND_URL } from "../backends"

export const useTracks = (): [TrackInterface[], string, () => Promise<void>] => {
  const [state, setState] = useRecoilState(trackAtom);

  const setTracks = (newList: TrackInterface[]) => setState({error: '', tracks: newList})
  const setError = (err: string) => setState(s => ({ ...s, error: err }));


  const fetchTracks = async () => {
      try {
          const response = await fetch(BACKEND_URL + '/tracks')
          if (!response.ok) throw new Error('Fetch error')
          const data: TrackInterface[] = await response.json()
          setTracks(data)
      } catch (error) {
          const e = error as Error
          setError(e.message)
      }
  }

  return [state.tracks, state.error, fetchTracks];
}