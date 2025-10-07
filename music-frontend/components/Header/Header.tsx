import React, { useState } from "react";
import Link from "next/link";
import classes from "./Header.module.css";
import FullscreenMenu from "../Navbar/FullscreenMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.container}>
          <nav className={classes.desktopNav}>
            <Link href="/" className={classes.navLink}>
              Home
            </Link>
            <Link href="/music" className={classes.navLink}>
              Tracks
            </Link>
            <Link href="/info" className={classes.navLink}>
              Info
            </Link>
          </nav>

          {/* Mobile burger button */}
          <button
            className={classes.burgerButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="30"
              height="22"
              viewBox="0 0 30 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 1H30M0 11H30M0 21H30"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </header>

      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};
