import axios from "axios";
import _ from "lodash";

const $http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.GITHUB_ACCESS}`,
  },
});

export const getPullRequestAPI = async (userProject, arr) => {
  try {
    const resp = await $http.get(`repos/${userProject}/pulls`);
    return resp.data;
  } catch (e) {
    return null;
  }
};

export const getPullRequest = (repo) => {
  return getPullRequestAPI(repo, [
    "title",
    "url",
    "state",
    "merged_at",
    "labels",
    "body",
    "requested_reviewers",
    "user.login",
  ]);
};
