import React from "react";
import { useEffect, useState, useRef } from "react";
import { StartModal } from "./cmps/start-modal";
import { Info } from "./cmps/info";
import { userSerive } from "../services/user-service";
import { utils } from "../services/utils";

export function Game() {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [level, setLevel] = useState<number>(0);
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const tileContainer = useRef<HTMLDivElement>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [tileData, setTileData] = useState<{ color: string }[]>([
    { color: "red" },
    { color: "green" },
    { color: "blue" },
    { color: "yellow" },
  ]);

  useEffect(() => {
    setScore();
  }, [setScore]);

  function setScore() {
    try {
      userSerive.getScores().then((data: number) => {
        setBestScore(data);
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  }
  function gameover() {
    tileContainer.current?.classList.add("over");
    tileContainer.current?.classList.add("unclickable");
    utils.playAudio("over");
    setTimeout(() => {
      tileContainer.current.classList.remove("over");
    }, 1700);
  }
  function activateTile(color: string) {
    const tile = tileContainer.current.querySelector(`[data-tile='${color}']`);
    utils.playAudio(color);
    tile.classList.add("activated");
    setTimeout(() => {
      tile.classList.remove("activated");
    }, 300);
  }

  function playRound(nextSequence: string[]) {
    checkBestScore(level);
    nextSequence.forEach((color: string, index: number) => {
      setTimeout(() => {
        activateTile(color);
      }, (index + 1) * 700);
    });
  }
  function nextStep(): string {
    const tiles: string[] = ["red", "green", "blue", "yellow"];
    const random: string = tiles[Math.floor(Math.random() * tiles.length)];
    return random;
  }
  function nextRound() {
    tileContainer.current?.classList.add("unclickable");
    setLevel((prevLevel: number) => prevLevel + 1);
    setSequence((prevSequence: string[]) => {
      const newSequence = [...prevSequence, nextStep()];
      playRound(newSequence);
      return newSequence;
    });

    setTimeout(() => {
      tileContainer.current?.classList.remove("unclickable");
    }, level * 700 + 1000);
  }

  function checkBestScore(level: number): void {
    const score = level;
    if (score > bestScore) {
      setBestScore(score);
      userSerive.setScore(score);
    }
  }

  async function handleClick(color: string) {
    await utils.playAudio(color);

    setPlayerSequence((prevSequence: string[]) => {
      let newSequence = [...prevSequence, color];
      const index = newSequence.length - 1;
      if (newSequence[index] !== sequence[index]) {
        gameover();
        setTimeout(() => {
          resetGame();
        }, 1700);
        return [];
      }
      if (newSequence.length === sequence.length) {
        newSequence = [];
        setTimeout(() => {
          nextRound();
        }, 700);
      }
      return newSequence;
    });
  }

  function startGame(): void {
    setIsDisplayed((current: boolean) => !current);
    nextRound();
  }

  function resetGame(): void {
    setIsDisplayed((current: boolean) => !current);
    setLevel(0);
    setSequence([]);
    setPlayerSequence([]);
  }

  return (
    <section className="game-container">
      <Info startGame={startGame} isDisplayed={isDisplayed} level={level} />
      <section
        ref={tileContainer}
        className="tile-container js-container unclickable"
      >
        {tileData.map((tile) => (
          <div
            key={tile.color}
            className={`tile tile-${tile.color}`}
            data-tile={tile.color}
            onClick={() => handleClick(tile.color)}
          ></div>
        ))}
      </section>
      <p className="best-display">Your Best: {bestScore}</p>
      <StartModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </section>
  );
}
