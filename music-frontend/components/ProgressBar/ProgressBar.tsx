import React from "react";
import c from "./ProgressBar.module.css";

interface ProgressBarProps {
  left: number;
  rigth: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  time?: string;
  duration?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ left, rigth, onChange, time, duration }) => {
  const percent = rigth ? (left / rigth) * 100 : 0;
  return (
    <div className={c.progressBarWrapper}>
      {time && <span className={c.time}>{time}</span>}
      <input
        className={c.progressBar}
        type="range"
        min={0}
        max={rigth}
        value={left}
        onChange={onChange}
        style={{ "--progress": `${percent}%` } as React.CSSProperties}
      />
      {duration && <span className={c.duration}>{duration}</span>}
    </div>
  );
};

export default ProgressBar;
