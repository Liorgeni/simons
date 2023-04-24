const userService = require("../services/user.service.ts");

module.exports = {
  updateScore,
};

function updateScore(userId: string, userScore: string) {
  return userService.save(userId, userScore);
}
