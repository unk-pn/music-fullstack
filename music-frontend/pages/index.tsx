import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';
import c from './index.module.css'

const Home = () => {
  const str: string = "\u276F";
  return (
    <div className={c.bg}>
      <MainLayout>
        <div className={c.grad4}></div>
        <div className={c.grad3}></div>
        <div className={c.grad1}></div>
        <div className={c.grad2}></div>
        <div className={c.main_content}>
          <div className={c.wrapper}>
            <div className={c.main_text}>
              <h1 className={c.welcome}>Welcome</h1>
              <p className={c.text}>Here you can listen and upload music!</p>
            </div>
              <Link
                href="/info"
                style={{ textDecoration: "none" }}
                className={c.info_btn}
              >
                Info Page {str}
              </Link>
          </div>
        </div>
      </MainLayout>
    </div>
  );};

export default Home;