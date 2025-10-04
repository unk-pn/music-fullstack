export interface CommentInterface {
  _id: string;
  username: string;
  text: string;
}

export interface TrackInterface {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: CommentInterface[];
  duration?: number;
}

export interface TrackState {
  tracks: TrackInterface[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = "FETCH_TRACKS",
  FETCH_TRACKS_ERROR = "FETCH_TRACKS_ERROR",
}

interface FetchTracksAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: TrackInterface[];
}

interface FetchTracksErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction;
