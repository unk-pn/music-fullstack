import React, { useEffect } from "react";
import { IconButton, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ProgressBar from "../ProgressBar/ProgressBar";
import { usePlayer } from "../../hooks/usePlayer";
import styles from "./Player.module.css";
import { BACKEND_URL } from "../../backends";

let audio: HTMLAudioElement;

const Player = () => {
  const [player, { play, pause, setVolume, setCurrentTime, setDuration }] =
    usePlayer();
  const { pause: isPaused, volume, active, duration, currentTime } = player;

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    if (active) {
      audio.src = BACKEND_URL + "/" + active.audio;
      audio.volume = volume / 100;
      audio.currentTime = currentTime;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        if (!isPaused) {
          audio.play();
        }
      };
      audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime));
    }
  }, [active]);

  useEffect(() => {
    if (!audio) return;
    if (isPaused) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [isPaused]);

  const togglePlay = () => {
    if (isPaused) {
      play();
      audio.play();
    } else {
      pause();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    audio.volume = vol / 100;
    setVolume(vol);
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  if (!active) return null;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className={styles.player}>
      <IconButton onClick={togglePlay}>
        {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
      <Grid
        container
        direction="column"
        style={{ width: 200, margin: "0 20px" }}
      >
        <div className={styles.title}>{active.name}</div>
        <div className={styles.artist}>{active.artist}</div>
      </Grid>
      <ProgressBar
        left={currentTime}
        rigth={duration}
        time={formatTime(currentTime)}
        duration={formatTime(duration)}
        onChange={changeCurrentTime}
      />
      <VolumeUpIcon style={{ marginLeft: "auto" }} />
      <ProgressBar
        left={volume}
        rigth={100}
        time={String(volume)}
        duration="100"
        onChange={changeVolume}
      />
    </div>
  );
};

export default Player;
