import { useState, useEffect, useCallback } from "react";
import frame1 from "../assets/miner/frame1.png";
import frame2 from "../assets/miner/frame2.png";
import frame3 from "../assets/miner/frame3.png";
import frame4 from "../assets/miner/frame4.png";
import frame5 from "../assets/miner/frame5.png";
import frame6 from "../assets/miner/frame6.png";
import frame7 from "../assets/miner/frame7.png";
import frame8 from "../assets/miner/frame8.png";
import frame9 from "../assets/miner/frame9.png";
import frame10 from "../assets/miner/frame10.png";
import styles from "./Miner.module.scss";

// Constants for configuration
const FRAME_COUNT = 10;
const FRAME_DURATION = 60; // milliseconds per frame
const TAP_THRESHOLD = 200; // milliseconds to determine if still tapping

function Miner({ setCount, multiplicator = 1 }) {
  const [frame, setFrame] = useState(1);
  const [lastTap, setLastTap] = useState(Date.now());
  const [animations, setAnimations] = useState([]);
  const frames = [
    frame1,
    frame2,
    frame3,
    frame4,
    frame5,
    frame6,
    frame7,
    frame8,
    frame9,
    frame10,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastTap = Date.now() - lastTap;
      if (timeSinceLastTap < TAP_THRESHOLD) {
        setFrame((prevFrame) => (prevFrame >= FRAME_COUNT ? 1 : prevFrame + 1));
      } else if (frame !== 1) {
        setFrame((prevFrame) => (prevFrame >= FRAME_COUNT ? 1 : prevFrame + 1));
      } else {
        clearInterval(interval);
      }
    }, FRAME_DURATION);

    return () => clearInterval(interval);
  }, [lastTap, frame]);

  const handleOnClick = useCallback(
    (event) => {
      const { clientX, clientY } = event; // Get the mouse coordinates from the event
      setLastTap(Date.now());
      setCount((prevCount) => prevCount + multiplicator);
      setAnimations((current) => [
        ...current,
        { id: Date.now(), value: `+${multiplicator}`, x: clientX, y: clientY },
      ]);
    },
    [setCount, multiplicator]
  );

  // Remove the animation from the state after it completes
  const removeAnimation = useCallback((id) => {
    setAnimations((current) => current.filter((anim) => anim.id !== id));
  }, []);

  return (
    <div>
      <img
        src={frames[frame - 1]}
        alt="GIF Frame"
        onClick={handleOnClick}
        style={{ cursor: "pointer" }}
      />
      {animations.map((anim) => (
        <div
          key={anim.id}
          className={styles.flyout}
          onAnimationEnd={() => removeAnimation(anim.id)}
          style={{ left: `${anim.x}px`, top: `${anim.y}px` }}
        >
          {anim.value}
        </div>
      ))}
    </div>
  );
}

export default Miner;
