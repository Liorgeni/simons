"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootCmp = void 0;
var react_1 = __importDefault(require("react"));
require("./assets/styles/main.scss");
var app_header_1 = require("./cmps/app-header");
var game_1 = require("./cmps/game");
function RootCmp() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(app_header_1.AppHeader, null),
        react_1.default.createElement(game_1.Game, null)));
}
exports.RootCmp = RootCmp;
