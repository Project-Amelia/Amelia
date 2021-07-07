import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import { config } from '../../../config/amelia.config';
import MessageService from '../../../services/MessageService';
import MessageServiceImpl from '../../../services/MessageServiceImpl';

const MAX_MESSAGES = 99;

export default class ClearCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;
  messageService: MessageService;

  constructor() {
    this.name = 'clear';
    this.alias = [];
    this.description = 'Verwijdert een aantal berichten.';
    this.usage = `${process.env.PREFIX}clear <aantal berichten>`;
    this.enabled = true;
    this.messageService = new MessageServiceImpl();
  }

  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    if (args.length === 0) {
      msg.reply('je moet een aantal opgeven.');
      return false;
    }

    const messagesToDelete = parseInt(args[0]);
    if (messagesToDelete) {
      if (messagesToDelete > MAX_MESSAGES) {
        msg.reply('je mag maximaal 99 messages clearen.');
        return false;
      }

      if (messagesToDelete < 0) {
        msg.reply('je mag geen negatieve getallen opgeven.');
        return false;
      }

      (msg.channel as Discord.TextChannel).bulkDelete(
        messagesToDelete + 1,
        true
      );

      let message = 'berichten';
      if (messagesToDelete === 1) {
        message = message.substring(0, message.length - 2);
      }

      this.messageService.sendEmbed(
        msg,
        'Ik heb de chat weer proper en netjes gemaakt!',
        config.gifs.clear,
        'Er stonden namelijk enkele nare berichtjes tussen.',
        `Ik heb ${messagesToDelete} ${message} verwijdert.`
      );
    } else {
      msg.reply('je moet een aantal opgeven.');
      return false;
    }

    return true;
  }
}
