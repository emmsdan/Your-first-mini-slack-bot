import axios from "axios";
import _ from "lodash";

const $http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_ACCESS}`,
  },
});

export const getPullRequest = async (userProject, arr) => {
  try {
    const resp = await $http.get(`repos/${userProject}/pulls`);
    return resp.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};
