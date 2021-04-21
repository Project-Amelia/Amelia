import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import { gifs } from '../../../assets/json/hug.gifs.json';
import MessageService from '../../../services/MessageService';
import MessageServiceImpl from '../../../services/MessageServiceImpl';

export default class HugCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;
  messageService: MessageService;

  constructor() {
    this.name = 'hug';
    this.alias = [];
    this.description = 'Send some lovely hugs to someone <3.';
    this.usage = `${process.env.PREFIX}hug`;
    this.enabled = true;
    this.messageService = new MessageServiceImpl();
  }

  // eslint-disable-next-line
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    // Create title message
    let title = `${msg.author.username} knuffelt`;
    const taggedUser = msg.mentions?.members?.first();
    if (taggedUser) {
      title = `${title} ${taggedUser.user.username}`;
    } else {
      title = `${title} Amelia`;
    }

    this.messageService.sendEmbed(
      msg,
      title,
      gifs[Math.floor(Math.random() * gifs.length)]
    );

    // TODO: save hug count, increase it somewhere. and if possible, get the current hugcount from everybody if its saved somewhere...
    // Database impediment, will come Soon™

    return true;
  }
}
