import { BACKEND_URL } from "."
import { TrackInterface } from "../state/types/track"

export const fetchTracks = async () => {
    try {
        const response = await fetch(BACKEND_URL + '/tracks')
        if (!response.ok) throw new Error('Fetch error')
        const data: TrackInterface[] = await response.json()
        return data
    } catch (e) {
        console.log((e as Error).message)
    }
}