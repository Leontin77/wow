import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Hero.scss";
import heroFront from "../../assets/heroFront.png";
import heroFront1 from "../../assets/heroFront1.png";
import heroFront2 from "../../assets/heroFront2.png";
import heroMining0 from "../../assets/heroMining.png";
import heroMining1 from "../../assets/heroMining1.png";
import heroMining2 from "../../assets/heroMining2.png";
import heroMining3 from "../../assets/heroMining3.png";
import heroMining4 from "../../assets/heroMining4.png";

const heroFrames = [heroFront, heroFront1, heroFront2]; // Array of imported sprite images
const miningFrames = [
  heroMining0,
  heroMining1,
  heroMining2,
  heroMining3,
  heroMining4,
];

const Hero = () => {
  const heroRef = useRef(null);
  const heroTlRef = useRef(null);

  const heroAnimation = () => {
    const heroElement = heroRef.current;
    let frameIndex = 0;

    const updateHeroFrame = () => {
      heroElement.src = heroFrames[frameIndex % heroFrames.length];
      frameIndex += 1;
    };

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    heroTlRef.current = tl;

    let position = 1;
    tl.to(heroElement, {
      x: 100,
      y: 70,
      duration: 5,
      ease: "linear",
      onUpdate: () => {
        const xPos = gsap.getProperty(heroElement, "x");
        const yPos = gsap.getProperty(heroElement, "y");

        if (xPos >= 100) {
          position = -1;
        } else if (xPos <= 1) {
          animateMining();
          position = 1;
        }
        heroElement.style.transform = `translate(${xPos}px, ${yPos}px) scaleX(${position})`;
      },
    });

    tl.to(
      {},
      {
        duration: 0.1,
        repeat: 5 * 10 - 1,
        onRepeat: updateHeroFrame,
        ease: "none",
      },
      0
    );

    return () => {
      tl.kill();
    };
  };

  const animateMining = () => {
    const heroElement = heroRef.current;
    const miningTl = gsap.timeline({
      onComplete: () => {
        if (heroTlRef.current) {
          heroTlRef.current.resume(); // Resume walking animation after mining
        }
      },
    });

    if (heroTlRef.current) {
      heroTlRef.current.pause(); // Pause walking animation before mining
    }

    miningTl.to(heroElement, {
      onUpdate: () => {
        const frameIndex = Math.floor(miningTl.time() / 0.1) % miningFrames.length;
        heroElement.src = miningFrames[frameIndex];
        heroElement.style.transform = `scaleX(-1)`
      },
      duration: 0.5,
      ease: "steps(5)",
    });
  };

  useEffect(() => {
    heroAnimation();
    return () => {
      if (heroTlRef.current) {
        heroTlRef.current.kill();
      }
    };
  }, []);

  return (
    <img
      ref={heroRef}
      src={heroFrames[0]}
      alt="Hero walking"
      className="hero"
      style={{
        position: "absolute",
        left: "85px",
        top: "230px",
      }}
    />
  );
};

export default Hero;
