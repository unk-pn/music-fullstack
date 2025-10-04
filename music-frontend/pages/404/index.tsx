import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import MainLayout from "../../layouts/MainLayout";
import { Button } from "../../components/Button/Button";
import styles from "./404.module.css";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <MainLayout
      title="404 - Page Not Found"
      description="Oops! The page you're looking for doesn't exist."
    >
      <div className={styles.container}>
        <div className={styles.grad1}></div>
        <div className={styles.grad2}></div>
        <div className={styles.grad3}></div>
        <div className={styles.grad4}></div>

        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Oops! Page Not Found</h1>
          <p className={styles.description}>
            Looks like this page got lost in the beat! The page you&apos;re
            looking for doesn&apos;t exist.
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.linkWrapper}>
              <Button str="Go Home" />
            </Link>

            <Button onClick={() => router.back()} str="Go Back" />
          </div>{" "}
          <div className={styles.musicNotes}>
            <div className={styles.note1}>♪</div>
            <div className={styles.note2}>♫</div>
            <div className={styles.note3}>♪</div>
            <div className={styles.note4}>♬</div>
          </div>
        </div>

        <div className={styles.vinyl}>
          <div className={styles.vinylRecord}>
            <div className={styles.vinylCenter}></div>
            <div className={styles.vinylGroove}></div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Custom404;