"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var info_1 = require("./cmps/info");
var user_service_1 = require("../services/user-service");
var utils_1 = require("../services/utils");
var lose_modal_1 = require("./cmps/lose-modal");
function Game() {
    var _a = (0, react_2.useState)(true), isDisplayed = _a[0], setIsDisplayed = _a[1];
    var _b = (0, react_2.useState)(0), level = _b[0], setLevel = _b[1];
    var _c = (0, react_2.useState)([]), sequence = _c[0], setSequence = _c[1];
    var _d = (0, react_2.useState)([]), playerSequence = _d[0], setPlayerSequence = _d[1];
    var tileContainer = (0, react_2.useRef)(null);
    var _e = (0, react_2.useState)(null), bestScore = _e[0], setBestScore = _e[1];
    var _f = (0, react_2.useState)([
        { color: "red" },
        { color: "green" },
        { color: "blue" },
        { color: "yellow" },
    ]), tileData = _f[0], setTileData = _f[1];
    var _g = (0, react_2.useState)(false), isModalOpen = _g[0], setIsModalOpen = _g[1];
    (0, react_2.useEffect)(function () {
        setScore();
    }, []);
    function setScore() {
        try {
            user_service_1.userSerive.getScores().then(function (data) {
                setBestScore(data.bestScore);
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    function activateTile(color) {
        var tile = tileContainer.current.querySelector("[data-tile='".concat(color, "']"));
        utils_1.utils.playAudio(color);
        tile.classList.add("activated");
        setTimeout(function () {
            tile.classList.remove("activated");
        }, 300);
    }
    function playRound(nextSequence) {
        nextSequence.forEach(function (color, index) {
            setTimeout(function () {
                activateTile(color);
            }, (index + 1) * 700);
        });
    }
    function nextStep() {
        var tiles = ["red", "green", "blue", "yellow"];
        var random = tiles[Math.floor(Math.random() * tiles.length)];
        return random;
    }
    function nextRound() {
        var _a;
        (_a = tileContainer.current) === null || _a === void 0 ? void 0 : _a.classList.add("unclickable");
        setLevel(function (prevLevel) { return prevLevel + 1; });
        setSequence(function (prevSequence) {
            var newSequence = __spreadArray(__spreadArray([], prevSequence, true), [nextStep()], false);
            playRound(newSequence);
            return newSequence;
        });
        setTimeout(function () {
            var _a;
            (_a = tileContainer.current) === null || _a === void 0 ? void 0 : _a.classList.remove("unclickable");
        }, level * 700 + 1000);
    }
    function checkBestScore(level) {
        var score = level - 1;
        if (score > bestScore) {
            setBestScore(score);
            user_service_1.userSerive.saveScore(score);
        }
    }
    function handleClick(color) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.utils.playAudio(color)];
                    case 1:
                        _a.sent();
                        setPlayerSequence(function (prevSequence) {
                            var newSequence = __spreadArray(__spreadArray([], prevSequence, true), [color], false);
                            var index = newSequence.length - 1;
                            if (newSequence[index] !== sequence[index]) {
                                checkBestScore(level);
                                resetGame();
                                return [];
                            }
                            if (newSequence.length === sequence.length) {
                                newSequence = [];
                                setTimeout(function () {
                                    nextRound();
                                }, 700);
                            }
                            return newSequence;
                        });
                        return [2 /*return*/];
                }
            });
        });
    }
    function startGame() {
        setIsDisplayed(function (current) { return !current; });
        nextRound();
    }
    function resetGame() {
        var _a;
        alert("lose");
        (_a = tileContainer.current) === null || _a === void 0 ? void 0 : _a.classList.add("unclickable");
        setIsDisplayed(function (current) { return !current; });
        setLevel(0);
        setSequence([]);
        setPlayerSequence([]);
    }
    return (react_1.default.createElement("section", { className: "game-container" },
        react_1.default.createElement(info_1.Info, { startGame: startGame, isDisplayed: isDisplayed, level: level }),
        react_1.default.createElement("section", { ref: tileContainer, className: "tile-container js-container unclickable" }, tileData.map(function (tile) { return (react_1.default.createElement("div", { key: tile.color, className: "tile tile-".concat(tile.color), "data-tile": tile.color, onClick: function () { return handleClick(tile.color); } })); })),
        react_1.default.createElement("p", { className: "best-display" },
            "Your Best: ",
            bestScore),
        react_1.default.createElement("button", { onClick: function () { return setIsModalOpen(true); } }, "open"),
        react_1.default.createElement(lose_modal_1.LoseModal, { isOpen: isModalOpen, onClose: function () { return setIsModalOpen(false); } })));
}
exports.Game = Game;
