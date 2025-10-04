import React from 'react';
import { Grid, Box } from '@mui/material';
import TrackItem from '../TrackItem/TrackItem';
import { useTracks } from '../../hooks/useTracks';
import { usePlayer } from '../../hooks/usePlayer';
import { TrackInterface } from '../../state/types/track';
import c from './TrackList.module.css';

interface TrackListProps {
  tracks?: TrackInterface[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks: propTracks }) => {
  const [tracksState] = useTracks();
  const [playerState] = usePlayer();
  const list = propTracks ?? tracksState ?? [];

  return (
    <Grid container direction="column">
      <Box p={2} className={c.trackList}>
      {/* <Box p={2}> */}
        {Array.isArray(list) &&
        list.map(track => (
          <TrackItem
            key={track._id}
            track={track}
            active={playerState.active?._id === track._id}
          />
        ))}
      </Box>
    </Grid>
  );
};

export default TrackList;