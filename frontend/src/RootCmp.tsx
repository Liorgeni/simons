import React from "react";
import "./assets/styles/main.scss";
import { AppHeader } from "./cmps/app-header";
import { Game } from "./cmps/game";

export function RootCmp(): JSX.Element {
  return (
    <div className="App">
      <AppHeader />
      <Game />
    </div>
  );
}
