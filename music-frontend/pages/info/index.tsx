import React from "react";
import MainLayout from "../../layouts/MainLayout";
// import Link from 'next/link';
import c from "./info.module.css";
import Link from "next/link";

const Home = () => (
  <div className={c.bg}>
    <MainLayout>
      <div className={c.grad1}></div>
      <div className={c.grad2}></div>
      <div className={c.grad3}></div>
      <div className={c.grad4}></div>
      <div className={c.wrapper}>
        <div className={c.center}>
          <h1 className={c.title}>Music Sharing App</h1>

          <div className={c.text}>
            <h1 className={c.subtitle}>Information Page</h1>
            <p>
              This page is designed to provide information about the music
              sharing app, its features, and how to use it effectively. Stay
              tuned for updates!
            </p>
            <p>
              If you have any questions or suggestions, feel free to reach out
              via the contact form or through the provided links.
            </p>
            <br />
            <p>
              You can also check out our custom{" "}
              <Link href="/404">404 page</Link>
            </p>
          </div>

          <div className={c.text}>
            <h2 className={c.subtitle}>Welcome to my music sharing app!</h2>
            <p>
              This is a personal project where you can upload your favorite
              tracks and listen to them right in the browser. The idea came from
              my love of music and curiosity to build a full-stack web app from
              scratch.
            </p>
          </div>

          <div className={c.text}>
            <h2 className={c.subtitle}>Work in progress!</h2>
            <p>
              This page is under construction. I plan to add more information
              about the app, its features, and how to use it effectively.
            </p>
          </div>

          <div className={c.text}>
            <h2 className={c.subtitle}>Technologies Used</h2>
            <ul className={c.list}>
              <li>Frontend: React, Recoil, Next.js, TypeScript</li>
              <li>Backend: Node.js, Express, MongoDB</li>
              <li>Audio Processing: Web Audio API</li>
            </ul>
          </div>

          <div className={c.text}>
            <h2 className={c.subtitle}>Dev Contact & Links</h2>

            <div className={c.links}>
              <a
                href="https://github.com/unk-pn"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                  style={{ height: "40px", width: "40px", margin: "0 10px" }}
                  alt="Github"
                />
              </a>

              <a href="https://t.me/unkpn_dev" target="_blank" rel="noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                  style={{ height: "40px", width: "40px", marginRight: 10 }}
                  alt="Telegram"
                />
              </a>

              <a href="https://unk-pn.ru" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  style={{ height: "40px", width: "40px", marginRight: 10 }}
                >
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
                </svg>
              </a>
            </div>
            <p>
              Designed by{" "}
              <a href="https://t.me/oki_6" className={c.designer}>
                @Oki
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  </div>
);

export default Home;
