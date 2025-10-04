import React from "react";
import { useRouter } from "next/router";
import styles from "./FullscreenMenu.module.css";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { text: "Home", href: "/" },
  { text: "Tracks", href: "/tracks" },
  { text: "Information", href: "/info" },
];

export default function FullscreenMenu({
  isOpen,
  onClose,
}: FullscreenMenuProps) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg
          className={styles.closeIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.menu}>
        <div className={styles.menuLinks}>
          {menuItems.map(({ text, href }) => (
            <button
              key={href}
              className={`${styles.menuLink} ${
                router.pathname === href ? styles.active : ""
              }`}
              onClick={() => handleNavigation(href)}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
