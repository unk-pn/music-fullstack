import React from 'react'
import c from './Button.module.css'

interface ButtonProps {
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    str: string;
}

export const Button: React.FC<ButtonProps> = ({ className, onClick, str }) => {
  return (
    <div className={`${c.btn} ${className}`} onClick={onClick}>
      <div className={c.btn_item}>
        <span>{str}</span>
      </div>
    </div>
  );
}
