import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import { config } from '../../../config/amelia.config.json';

export default class ClearCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  constructor() {
    this.name = 'clear';
    this.alias = [];
    this.description = 'Verwijdert een aantal berichten.';
    this.usage = `${process.env.PREFIX}clear <aantal berichten>`;
    this.enabled = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    if (args.length === 0) {
      msg.reply('je moet een aantal opgeven.');
      return;
    }

    const messagesToDelete = parseInt(args[0]);
    if (messagesToDelete) {
      (msg.channel as Discord.TextChannel).bulkDelete(messagesToDelete + 1);

      let footer = `Ik heb ${messagesToDelete} berichten verwijdert.`;
      if (messagesToDelete === 1) {
        footer = `Ik heb ${messagesToDelete} bericht verwijdert.`;
      }

      const embed = new Discord.MessageEmbed()
        .setColor(config.colors.primary)
        .setTitle('Ik heb de chat weer proper en netjes gemaakt!')
        .setImage(config.gifs.clear)
        .setDescription('Er stonden namelijk enkele nare berichtjes tussen.')
        .setFooter(footer);

      msg.channel.send(embed);
    } else {
      msg.reply('je moet een aantal opgeven.');
    }

    return true;
  }
}
