import cron from "node-cron";
import { toDaysMinutesSeconds } from "./utils.js";

export const startJob = (time, job) => {
  const toCronJob = toDaysMinutesSeconds(time);
  console.log({ toCronJob });
  return cron.schedule(toCronJob, job);
};

export const stopJob = (repos, repoName, job) => {
  const findRepo = repos.find((rep) => rep.repo === repoName);
  if (!findRepo) {
    throw "Repo does not exist.";
  }
  if (findRepo && findRepo.count >= 90) {
    job.stop();
    job = null;
    repos = repos.filter((rep) => rep.repo === repoName);
  }
  findRepo.count++;
};
