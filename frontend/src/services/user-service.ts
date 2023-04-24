import Axios from "axios";

export const userSerive = {
  setScore,
  getScores,
};

var axios = Axios.create({
  withCredentials: true,
});

const BASE_URL: string =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3030/api/";

async function getScores() {
  try {
    const res = await axios({
      url: BASE_URL + "scores",
      method: "get",
    });
    console.log(res.data);

    return res.data;
  } catch (err) {
    throw err;
  }
}

async function setScore(bestScore: number) {
  try {
    const res = await axios({
      url: BASE_URL + "scores",
      method: "post",
      data: { score: bestScore },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
}
