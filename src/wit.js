import witPkg from "node-wit";

const client = new witPkg.Wit({
  accessToken: process.env.WIT_TOKEN,
});

const getEntityDuration = (obj) => {
  return obj.entities["wit$duration:duration"]?.[0] ?? {};
};

const getEntityReminder = (obj) => {
  return obj.entities["wit$reminder:reminder"]?.[0] ?? {};
};

export const getMessageEntity = async (message) => {
  const resp = await client.message(message);
  return {
    ...(resp?.entities ?? {}),
    seconds: getEntityDuration(resp).value,
    repo: getEntityReminder(resp).value,
  };
};
