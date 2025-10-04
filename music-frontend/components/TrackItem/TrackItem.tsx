import React, { useEffect, useState } from "react";
import { Card, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { usePlayer } from "../../hooks/usePlayer";
import { TrackInterface } from "../../state/types/track";
import c from "./TrackItem.module.css";
import { BACKEND_URL } from "../../backends";

interface TrackItemProps {
  track: TrackInterface;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const [player, { setActiveTrack, play, pause }] = usePlayer();
  const isCurrent = player.active?._id == track._id;
  const isPlaying = isCurrent && !player.pause;
  const [localDuration, setLocalDuration] = useState<number | null>(null);

  useEffect(() => {
    if (!isCurrent && track.audio) {
      const audio = new window.Audio(BACKEND_URL + "/" + track.audio);
      const handler = () => setLocalDuration(audio.duration);
      audio.addEventListener("loadedmetadata", handler);
      return () => {
        audio.removeEventListener("loadedmetadata", handler);
        audio.src = "";
      };
    }
  }, [track.audio, isCurrent]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isCurrent) {
      setActiveTrack(track);
      play();
    } else if (player.pause) {
      play();
    } else {
      pause();
    }
  };

  const deleteTrack = async () => {
    try {
      const response = await fetch(BACKEND_URL + "/tracks/" + track._id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete track");
      }
    } catch (e) {
      console.error(e);
    }
    router.reload();
  };

  function formatTime(sec: number | undefined | null) {
    if (!sec && sec !== 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <Card
      className={`${c.track} ${isCurrent ? c.active : ""}`}
      onClick={() => router.push("/tracks/" + track._id)}
      style={{
        borderRadius: 24,
        backgroundColor: "transparent",
      }}
    >
      <IconButton onClick={togglePlay}>
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <img
        width={70}
        height={70}
        src={BACKEND_URL + "/" + track.picture}
        // src={"http://localhost:5500/" + track.picture}
        alt={track.name}
        onClick={(e) => e.stopPropagation()}
        className={c.image}
      />
      <div className={c.track_info}>
        <div className={c.track_name}>{track.name}</div>
        <div className={c.artist}>{track.artist}</div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
      >
        <div className={c.time} style={{ marginRight: 12 }}>
          {isCurrent
            ? `${formatTime(player.currentTime)} / ${formatTime(
                player.duration
              )}`
            : formatTime(localDuration)}
        </div>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            deleteTrack();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default TrackItem;
