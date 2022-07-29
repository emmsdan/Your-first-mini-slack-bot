export const generatePRsBlock = (prs) => {
  return !prs
    ? [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `There are currently no PR Opened.`,
          },
        },
      ]
    : prs.map((pr) => ({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${pr.title}*\nAuthor: \`${
            pr.user.login
          }\`\n*Body*: \`\`\`${pr.body?.slice(0, 200)}\`\`\`\n*<${
            pr.html_url
          }|${pr.html_url}>*
      `,
        },
      }));
};

export const generator = ({ repo, prs }) => {
  return {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Currently Opened PRs.",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "Repository",
          },
          {
            type: "mrkdwn",
            text: `*${repo}*`,
          },
        ],
      },
      {
        type: "divider",
      },
      ...generatePRsBlock(prs),
    ],
  };
};
