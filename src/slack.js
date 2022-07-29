import Bolt from "@slack/bolt";
import { port } from "./config.js";
import database from "./database.js";

// const receiver =  new Bolt.ExpressReceiver({  signingSecret: process.env.SLACK_SIGNING_SECRET, endpoints: '/', port})
const app = new Bolt.App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port,
  customRoutes: [
    {
      method: "GET",
      handler: (req, res) => {
        res.end(JSON.stringify(database));
      },
      path: "/",
    },
  ],
});

export default app;
