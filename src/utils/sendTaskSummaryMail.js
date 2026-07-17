const transporter = require("../config/emailVerify");

const sendTaskSummaryEmail = async (
  user,
  overdueTasks,
  upcomingTasks,
  completedTasks,
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Your Daily Task Summary",

    html: `
    <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:20px;background:#f8f9fa;border-radius:10px">

      <h2 style="text-align:center;color:#2563eb;">
        📋 Daily Task Summary
      </h2>

      <p>Hello <b>${user.name}</b>,</p>

      <p>
        Here is the summary of your tasks.
      </p>

      <hr>

      <h3 style="color:red;">
        🔴 Overdue Tasks (${overdueTasks.length})
      </h3>

      ${
        overdueTasks.length
          ? `<ul>
              ${overdueTasks
                .map(
                  (task) => `
                    <li>
                      <b>${task.title}</b><br>
                      Due Date :
                      ${new Date(task.dueDate).toLocaleDateString()}
                    </li>
                  `,
                )
                .join("")}
            </ul>`
          : "<p>No overdue tasks 🎉</p>"
      }

      <hr>

      <h3 style="color:orange;">
        🟠 Upcoming Tasks (${upcomingTasks.length})
      </h3>

      ${
        upcomingTasks.length
          ? `<ul>
              ${upcomingTasks
                .map(
                  (task) => `
                    <li>
                      <b>${task.title}</b><br>
                      Due Date :
                      ${new Date(task.dueDate).toLocaleDateString()}
                    </li>
                  `,
                )
                .join("")}
            </ul>`
          : "<p>No upcoming tasks.</p>"
      }

      <hr>

      <h3 style="color:green;">
        🟢 Completed Tasks (${completedTasks.length})
      </h3>

      ${
        completedTasks.length
          ? `<ul>
              ${completedTasks
                .map(
                  (task) => `
                    <li>
                      <b>${task.title}</b>
                    </li>
                  `,
                )
                .join("")}
            </ul>`
          : "<p>No completed tasks.</p>"
      }

      <hr>

      <p style="margin-top:30px;">
        Keep up the great work! 🚀
      </p>

    </div>
    `,
  });
};

module.exports = sendTaskSummaryEmail;
