const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "cleanchatall",
    description: "Clean All Message in This Channel",
    dm_permissions: "0",
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

    const channel = interaction.channel;


    //Main System
    try {
      const messages = await channel.messages.fetch();

      await channel.bulkDelete(messages);

      //Embed
      interaction.reply({
        embeds: [
          {
            title: `Chat Cleared`,
            color: 0x00ffaa, // = #00FFAA = green
          },
        ],
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({
        embeds: [
          {
            title: `Cant Clear`,
            color: FF3333,
          },
        ],
        ephemeral: true,
      });
    }
  },
};
