"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var client_1 = __importDefault(require("react-dom/client"));
var RootCmp_1 = require("./RootCmp");
var root = client_1.default.createRoot(document.getElementById("root"));
root.render(react_1.default.createElement(RootCmp_1.RootCmp, null));
