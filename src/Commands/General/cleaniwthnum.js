const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "cleanchat",
    description: "Clean a specific number of messages above this command",
    options: [
      {
        name: "amount",
        description: "Number of messages to clear",
        type: 4,
        required: true,
      },
    ],
  },
  async execute(interaction, client) {
    if (!interaction.guild) {
        return interaction.reply("This command can only be used in a server.");
      }
  
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      )
        return await interaction.reply({
            embeds: [
              {
                title: `❌You can't Use This Command!`,
                color: 0xFF3333,
              },
            ],
            ephemeral: true,
          });
    const amount = interaction.options.getInteger("amount");
    const channel = interaction.channel;

    //Main System
    try {
      const messages = await channel.messages.fetch({ limit: amount });

      await channel.bulkDelete(messages);

      //Embed
    interaction.reply({
        embeds: [
          {
            title: `Chat Cleared ${messages.size} Message`,
            color: 0x00ffaa,
          },
        ],
        ephemeral: true,
      });
    } catch (error) {
        interaction.reply({
            embeds: [
              {
                title: `Cant Clear`,
                color: 0xFF3333,
              },
            ],
            ephemeral: true,
          });
    }
  },
};
