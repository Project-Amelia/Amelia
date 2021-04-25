import Discord from 'discord.js';
import BotCommand from '../../BotCommand';

export default class WelkomCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  constructor() {
    this.name = 'welkom';
    this.alias = [];
    this.description = 'Laat een gebruiker toe aan de server';
    this.usage = `${process.env.PREFIX}welkom <tag>`;
    this.enabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    // create embed message
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setColor('#0088ff')
      .setTitle('OK')
      .setImage(
        `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png?size=4096`
      )
      .setTimestamp()
      .setFooter('Het is oke');

    msg.channel.send(embed);
    return true;
  }
}
