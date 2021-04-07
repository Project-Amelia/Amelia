import Discord from 'discord.js';
import BotCommand from '../../BotCommand';
import hugJson from '../../../assets/json/hug.gifs.json';
import { HugConstants } from '../../../utils/constants/HugConstants';
import { config } from '../../../config/amelia.config.json';

export default class HugCommand implements BotCommand {
  name: string;
  alias: string[];
  description: string;
  usage: string;
  enabled: boolean;

  constructor() {
    this.name = 'hug';
    this.alias = [];
    this.description = 'Send some lovely hugs to someone <3.';
    this.usage = `${process.env.PREFIX}hug`;
    this.enabled = true;
  }

  // eslint-disable-next-line
  execute(msg: Discord.Message, args: string[]): boolean {
    if (!this.enabled) return false;

    let title = `${msg.author.username} knuffelt`;
    const taggedUser = msg.mentions?.members?.first();
    if (taggedUser) {
      title = `${title} ${taggedUser.user.username}`;
    } else {
      title = `${title} Amelia`;
    }

    const hugGifs = hugJson.actions.filter(
      (e) => e.name === HugConstants.actionGifName
    );
    const hugGif = hugGifs[Math.floor(Math.random() * hugGifs.length)];

    // create embed message
    const rmQuoteRegex = /^"+|"+$/g;
    const embed: Discord.MessageEmbed = new Discord.MessageEmbed()
      .setColor(config.colors.primary)
      .setTitle(title)
      .setImage(hugGif.value.replace(rmQuoteRegex, ''));

    msg.channel.send(embed);
    return true;
  }
}
