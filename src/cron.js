import cron from "node-cron";
import { toDaysMinutesSeconds } from "./utils.js";

export const startJob = (time, job) => {
  const toCronJob = toDaysMinutesSeconds(time);
  console.log({ toCronJob });
  return cron.schedule(toCronJob, job);
};
