"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
var react_1 = __importDefault(require("react"));
function Info(_a) {
    var startGame = _a.startGame, isDisplayed = _a.isDisplayed, level = _a.level;
    var score = level - 1;
    return (react_1.default.createElement("section", { className: "info" },
        react_1.default.createElement("button", { className: isDisplayed ? "start-btn" : "hidden", onClick: function () { return startGame(); } }, "Start!"),
        react_1.default.createElement("div", { className: isDisplayed ? "hidden " : "user-info" },
            react_1.default.createElement("p", { className: "score-display" }, score))));
}
exports.Info = Info;
