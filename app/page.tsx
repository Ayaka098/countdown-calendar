"use client";

import { CSSProperties, useEffect, useState } from "react";
import styles from "./page.module.css";

const END_DATE = new Date("2026-05-31T00:00:00");
const STAR_COLORS = ["#ffd447", "#b04bcc", "#007bbb", "#00a96e", "#e60033"];

const calculateDaysLeft = () => {
  const today = new Date();
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diff = END_DATE.getTime() - startOfToday.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.ceil(diff / msPerDay));
};

const createStarSvg = (color: string) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><polygon points='32,2 39,22 60,24 43,36 48,58 32,46 16,58 21,36 4,24 25,22' fill='${color}'/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const generateStarStyle = (): CSSProperties => {
  const images: string[] = [];
  const positions: string[] = [];
  const sizes: string[] = [];

  // Keep counts even across member colors; total varies slightly per load
  const perColorCount = 5 + Math.floor(Math.random() * 3); // 5-7 each color

  STAR_COLORS.forEach((color) => {
    for (let i = 0; i < perColorCount; i++) {
      const size = 14 + Math.random() * 18; // 14px - 32px
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      images.push(`url("${createStarSvg(color)}")`);
      positions.push(`${x}% ${y}%`);
      sizes.push(`${size}px ${size}px`);
    }
  });

  return {
    backgroundImage: images.join(", "),
    backgroundPosition: positions.join(", "),
    backgroundSize: sizes.join(", "),
    backgroundRepeat: "no-repeat",
  };
};

export default function Home() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [flip, setFlip] = useState(false);
  const [starStyle, setStarStyle] = useState<CSSProperties>();

  useEffect(() => {
    setDaysLeft(calculateDaysLeft());
    const timer = setTimeout(() => setFlip(true), 180);
    setStarStyle(generateStarStyle());
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.background}>
        <div className={styles.stripes} />
        <div className={styles.stars} style={starStyle} />
        <div className={styles.sparkles} />
        <div className={styles.shine} />
      </div>
      <main className={styles.main}>
        <div className={styles.badgeRow}>
          <span className={styles.pill}>ARASHI Countdown</span>
          <span className={styles.sticker}>2026.05.31</span>
        </div>
        <div className={`${styles.calendar} ${flip ? styles.showFlip : ""}`}>
          <div className={styles.hanger}>
            <div className={styles.hole} />
            <div className={styles.hole} />
          </div>
          <div className={styles.cardBody}>
            <p className={styles.lead}>嵐の活動終了まで</p>
            <p className={styles.days}>
              <span className={styles.smallLabel}>あと</span>{" "}
              <span className={styles.count}>{daysLeft ?? "—"}</span>{" "}
              <span className={styles.smallLabel}>日</span>
            </p>
          </div>
          <div className={styles.flipSheet}>
            <div className={styles.flipPattern} />
          </div>
        </div>
      </main>
    </div>
  );
}
