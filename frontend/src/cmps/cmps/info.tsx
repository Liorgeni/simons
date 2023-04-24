import React from "react";

export function Info({ startGame, isDisplayed, level }) {
  const score: number = level - 1;

  return (
    <section className="info">
      <button
        className={isDisplayed ? "start-btn" : "hidden"}
        onClick={() => startGame()}
      >
        Start!
      </button>
      <div className={isDisplayed ? "hidden " : "user-info"}>
        <p className="score-display">{score}</p>
      </div>
    </section>
  );
}
