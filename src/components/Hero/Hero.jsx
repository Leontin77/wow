import React, { useEffect, useState, useRef } from "react";
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
  const tlRef = useRef(null);

  const heroAnimation = (scale) => {
    const heroElement = heroRef.current;
    let frameIndex = 0;
    let xPos = 0;
    let yPos = 230;

    const updateHeroFrame = () => {
      heroElement.src = heroFrames[frameIndex % heroFrames.length];
      frameIndex += 1;
    };

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    let position
    tl.to(heroElement, {
      x: 100,
      y: 70,
      duration: 5,
      ease: "linear",
      onUpdate: () => {
        xPos = gsap.getProperty(heroElement, "x");
        yPos = gsap.getProperty(heroElement, "y");

        if (xPos === 100) {
          position = -1
        } else if (xPos <= 1) {
          animateMining();
          position = 1
        }
        // console.log(position);
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

  function animateMining() {
    const heroElement = heroRef.current;
    const miningTl = gsap.timeline({
      // onComplete: () => {
      //   tlRef.current.resume(); // Resume walking animation after mining
      // },
    });

    miningTl.to(heroElement, {
      onUpdate: () => {
        const frameIndex =
          Math.floor(miningTl.time() / 0.1) % miningFrames.length;
        heroElement.src = miningFrames[frameIndex];
      },
      duration: 3,
      ease: "steps(5)",
    });
  }

  useEffect(() => {
    heroAnimation();
    // animateMining();
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

