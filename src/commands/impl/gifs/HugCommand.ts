import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import hugJson from '../../../assets/json/hug.gifs.json';
import { HugConstants } from '../../../utils/constants/HugConstants';
import { config } from '../../../config/amelia.config.json';
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

    // TODO: remove this filter implementation, remove regex, we need a new json file for this...
    const hugGifs = hugJson.actions.filter(
      (e) => e.name === HugConstants.actionGifName
    );
    const hugGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];
    const rmQuoteRegex = /^"+|"+$/g;

    this.messageService.sendEmbed(
      msg,
      title,
      hugGif.value.replace(rmQuoteRegex, '')
    );

    // TODO: save hug count, increase it somewhere. and if possible, get the current hugcount from everybody if its saved somewhere...

    return true;
  }
}
