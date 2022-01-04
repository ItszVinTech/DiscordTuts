const client = require("../index");

client.on("messageCreate", async (message) => {
  if (message.channel.id == '894201804752048168') {
    try {
      const { chatBot } = require('tech-tip-cyber')
      if (message.author.bot) return;
      const reply = await chatBot({ Message: message.content }); // Get The Message User Sent, Message: <msg>
      return message.reply(`\`\`\`js\n${reply}\n\`\`\``); // Reply To User's Message

    } catch (error) {
      message.channel.send(`\`\`\`js\n${error}\n\`\`\``)
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }


  }

  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases ?.includes(cmd.toLowerCase()));

  if (!command) return;
  await command.run(client, message, args);
});
