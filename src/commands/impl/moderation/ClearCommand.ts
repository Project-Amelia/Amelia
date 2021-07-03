import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import { config } from '../../../config/amelia.config.json';
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    if (args.length === 0) {
      msg.reply('je moet een aantal opgeven.');
      return;
    }

    const messagesToDelete = parseInt(args[0]);
    if (messagesToDelete) {
      if (messagesToDelete > MAX_MESSAGES || messagesToDelete < 0) {
        msg.reply('je mag maximaal 99 messages clearen.');
        return false;
      }

      (msg.channel as Discord.TextChannel).bulkDelete(
        messagesToDelete + 1,
        true
      );

      let footer = `Ik heb ${messagesToDelete} berichten verwijdert.`;
      if (messagesToDelete === 1) {
        footer = `Ik heb ${messagesToDelete} bericht verwijdert.`;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gifs: any = config.gifs;
      this.messageService.sendEmbed(
        msg,
        'Ik heb de chat weer proper en netjes gemaakt!',
        gifs.clear,
        'Er stonden namelijk enkele nare berichtjes tussen.',
        footer
      );
    } else {
      msg.reply('je moet een aantal opgeven.');
      return false;
    }

    return true;
  }
}
