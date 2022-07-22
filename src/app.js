import app from "./slack.js";
import { port } from "./config.js";
import { getMessageEntity } from "./wit.js";
import { startJob } from "./cron.js";
import { getPullRequest } from "./github.js";
import database from "./database.js";
import { generator } from "./block.js";

app.command("/watch", async ({ command, respond, ack }) => {
  await ack();

  // get repo command.text
  const [repo, ...others] = command.text?.toLowerCase()?.split(" ") ?? [];

  // call Wit.ai for intent
  const { seconds } = await getMessageEntity(command.text);

  // create a job to run at scheduled interval
  let job = startJob(seconds, async () => {
    try {
      // fetch PRs from GitHub
      const prs = await getPullRequest(repo);
      // return the PRs back to slack
      await respond(generator({ repo, prs }));
    } catch (e) {
      console.log(e.response);
    }
  });
  // add to watch list
  database.repos.push({ repo, timer: seconds, job });

  // Initial Responds
  await respond(`Added "${repo}" to watch list for ${others.join(" ")}`);
});

(async () => {
  // Start your app
  await app.start();
  console.log("⚡️ Bolt app is running! " + port);
})();
