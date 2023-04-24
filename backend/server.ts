import path from "path";

var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var userService = require("./services/user.service.ts");
var userController = require("./controller/user.controller.ts");

const app = express();

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.get(
  "/api/scores",
  (
    req: { cookies: { score: string } },
    res: {
      cookie: (arg0: string, arg1: string) => void;
      send: (arg0: string) => void;
    }
  ) => {
    let score = 0;
    if (!req.cookies.score) {
      const user = userService.createUser();
      res.cookie("score", JSON.stringify(user));
    } else {
      score = userService.get(JSON.parse(req.cookies.score).id).score;
    }
    res.send(score.toString());
  }
);
app.post(
  "/api/scores",
  (
    req: { cookies: { score: string }; body: { score: any } },
    res: {
      cookie: (arg0: string, arg1: string) => void;
      send: (arg0: any) => any;
    }
  ) => {
    const { id: userId } = JSON.parse(req.cookies.score);
    const userScore = userController.updateScore(userId, req.body.score);
    const user = { id: userId, score: userScore };
    res.cookie("score", JSON.stringify(user));
    return res.send(userScore.toString());
  }
);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
