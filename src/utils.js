export const toDaysMinutesSeconds = (totalSeconds) => {
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const days = Math.floor(totalSeconds / (3600 * 24));

  return `*${seconds ? "/" + seconds : ""} ${minutes || "*"} ${hours || "*"} ${
    days || "*"
  } * *`;
};
const reminderType = ["every", "at"];
