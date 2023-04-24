const utilService = require("./util.service.ts");
const fs = require("fs");

var scores = require("../data/scores.json");

module.exports = {
  get,
  save,
  createUser,
};

function get(userId: any) {
  return scores.find((score: { id: any }) => score.id === userId);
}

function save(userId: string, score: number) {
  console.log(`user_Id: ${userId} newBest: ${score}`);
  const userIdx = scores.findIndex(
    (score: { id: string }) => score.id === userId
  );

  scores[userIdx].score = score;
  _writeScoresToFile();
  return score;
}

function createUser() {
  const userId = utilService.makeId();
  const user = { id: userId, score: 0 };
  scores.push(user);
  _writeScoresToFile();
  return user;
}

function _writeScoresToFile() {
  return new Promise((res, rej) => {
    const data = JSON.stringify(scores, null, 2);
    fs.writeFile("data/scores.json", data, (err: any) => {
      if (err) return rej(err);
      res("");
    });
  });
}
