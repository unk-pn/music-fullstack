import React from 'react'
import classes from './TextSwipeGlow.module.css'

interface TextSwipeGlowProps {
    text: string;
    disabled?: boolean;
    onClick?: () => void
}

export const TextSwipeGlow: React.FC<TextSwipeGlowProps> = ({ text, disabled=false, onClick }) => {
    return (
            <button className={classes.btn} disabled={disabled} onClick={onClick}>
                &nbsp;{text}&nbsp;
                <span className={classes.hover_text} aria-hidden="true"> &nbsp;{text}&nbsp; </span>
            </button>
    )
}